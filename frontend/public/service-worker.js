const CACHE_NAME = 'image-cache-v1'
const TOKEN_CACHE_NAME = 'auth-tokens-v1'

// --- 1. Хранилище домена в памяти SW ---
let CURRENT_BACKEND_DOMAIN = 'localhost'
self.ALLOWED_CACHED_PATHS = []

// --- 2. Вспомогательная функция для получения полного URL ---
function getBackendDomain() {
  return CURRENT_BACKEND_DOMAIN
}

function getBackendUrl(path) {
  const domain = getBackendDomain()
  // Предполагаем HTTPS и 443 порт, или можно передавать протокол тоже
  // Если path уже содержит http, не трогаем его
  if (path.startsWith('http')) return path

  // Убедимся, что path начинается со слеша
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `https://${domain}:443${cleanPath}` // Или просто https://${domain}${cleanPath}
}

// --- 3. Слушаем сообщения от React приложения ---
self.addEventListener('message', (event) => {
  const { domain, payload, type } = event.data

  if (type === 'UPDATE_BACKEND_DOMAIN') {
    CURRENT_BACKEND_DOMAIN = domain || 'localhost'
    console.log('SW: Domain updated to:', CURRENT_BACKEND_DOMAIN)
  }

  // (Опционально) Если нужно запросить домен при старте
  if (type === 'GET_BACKEND_DOMAIN') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({ domain: CURRENT_BACKEND_DOMAIN })
    }
  }

  if (type === 'SET_PARAMS') {
    if (payload?.ALLOWED_CACHED_PATHS) {
      self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS
    }
  }
})

async function accessTokenMiddleware(request) {
  // Получаем правильный URL для бэкенда
  const url = new URL(request.url)
  const path = url.pathname + url.search
  const backendUrl = getBackendUrl(path)

  // ВАЖНО: Мы создаем новый Request с новым URL (backendUrl)
  // Это перенаправит запрос с localhost:3000 на ваш реальный сервер

  if (request.headers.has('Authorization')) {
    // Просто меняем URL
    return fetch(new Request(backendUrl, request))
  }

  let token = await getAccessToken()

  if (!token) {
    console.log('Fetch access token (middleware)')
    token = await fetchAccessToken()
  }

  // Если токена нет, шлем запрос как есть (но на правильный URL)
  if (!token) {
    return fetch(new Request(backendUrl, request))
  }

  // Клонируем заголовки и добавляем токен
  const headers = new Headers(request.headers)
  headers.set('Authorization', `Bearer ${token}`)

  const modifiedRequest = new Request(backendUrl, {
    body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.clone().body : null,
    credentials: 'include', // Важно для кук/cors
    duplex: 'half',
    headers: headers,
    method: request.method,
    mode: 'cors',
  })

  let response = await fetch(modifiedRequest)

  if (response.status === 401) {
    console.log('401 detected, refreshing token...')
    token = await fetchAccessToken()
    if (!token) {
      return response
    }

    headers.set('ngrok-skip-browser-warning', 'true')

    headers.set('Authorization', `Bearer ${token}`)

    const retryRequest = new Request(backendUrl, {
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.clone().body : null,
      credentials: 'include',
      duplex: 'half',
      headers: headers,
      method: request.method,
      mode: 'cors',
    })
    response = await fetch(retryRequest)
  }

  return response
}

async function clearAccessToken() {
  const cache = await caches.open(TOKEN_CACHE_NAME)
  await cache.delete('/access-token')
}

async function fetchAccessToken() {
  console.log('Fetching new access token...')

  try {
    // Используем getBackendUrl для запроса токена
    const response = await fetch(getBackendUrl('/api/auth/token'), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      method: 'POST',
    })

    if (!response.ok) {
      console.error('Failed to fetch access token:', response.status)
      await clearAccessToken()
      return null
    }

    const data = await response.json()
    console.log('Token received via SW')

    await setAccessToken(data.access_token, 4.5 * 60 * 1000)
    return data.access_token
  } catch (err) {
    console.error('Error fetching access token:', err)
    await clearAccessToken()
    return null
  }
}

// ... (getAccessToken и setAccessToken без изменений) ...
async function getAccessToken() {
  const cache = await caches.open(TOKEN_CACHE_NAME)
  const tokenResp = await cache.match('/access-token')
  if (!tokenResp) return null
  try {
    const data = await tokenResp.json()
    if (data.expiresAt && data.expiresAt < Date.now()) {
      await cache.delete('/access-token')
      return null
    }
    return data.token
  } catch (e) { return null }
}

async function setAccessToken(token, expiresInMs = 5 * 60 * 1000) {
  const cache = await caches.open(TOKEN_CACHE_NAME)
  const data = { expiresAt: Date.now() + expiresInMs, token }
  const response = new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
  await cache.put('/access-token', response)
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return
  }

  // Проверяем, идет ли запрос на /api/
  // (обычно с фронтенда это запрос к текущему origin, например http://localhost:3000/api/...)
  const isApiRequest = url.pathname.startsWith('/api/')

  if (isApiRequest) {
    const pathname = url.pathname

    if (pathname.includes('/api/auth/logout')) {
      event.respondWith(
        (async () => {
          await clearAccessToken()
          // Перенаправляем на бэкенд
          return fetch(getBackendUrl(pathname + url.search), { ...request, mode: 'cors' })
        })(),
      )
      return
    }

    if (pathname.includes('/api/auth/')) {
      // Просто проксируем запрос на бэкенд без токена
      event.respondWith(fetch(getBackendUrl(pathname + url.search), request))
      return
    }

    event.respondWith(accessTokenMiddleware(request))
    return
  }

  // Логика кэширования картинок (остается такой же, но с проверкой ALLOWED_CACHED_PATHS)
  const isImage = request.destination === 'image'
  const isAllowedPath = self.ALLOWED_CACHED_PATHS.some((path) =>
    url.pathname.startsWith(path),
  )

  if (isImage && isAllowedPath) {
    // ... ваш код кэширования ...
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) cache.put(request, networkResponse.clone())
            return networkResponse
          })
        }),
      ),
    )
    return
  }
})
