const CACHE_NAME = 'image-cache-v1'
const TOKEN_CACHE_NAME = 'auth-tokens-v1'
const DEFAULT_BACKEND_URL = 'http://localhost:8000'

self.BACKEND_URL = null
self.ALLOWED_CACHED_PATHS = []

async function accessTokenMiddleware(request) {
  if (request.headers.has('Authorization')) {
    return fetch(request)
  }

  let token = await getAccessToken()

  if (!token) {
    token = await fetchAccessToken()
  }

  if (!token) {
    return fetch(request)
  }

  const modifiedRequest = new Request(request, {
    headers: new Headers({
      ...Object.fromEntries(request.headers.entries()),
      Authorization: `Bearer ${token}`,
    }),
  })

  let response = await fetch(modifiedRequest)

  if (response.status === 401) {
    token = await fetchAccessToken()
    if (!token) {
      return response
    }

    const retryRequest = new Request(request, {
      headers: new Headers({
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${token}`,
      }),
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
  if (!self.BACKEND_URL) {
    console.warn('BACKEND_URL not set, cannot fetch token')
    return null
  }

  console.log('Fetching new access token...')

  try {
    const response = await fetch(`${self.BACKEND_URL}/api/auth/token`, {
      credentials: 'include',
      method: 'POST',
    })

    if (!response.ok) {
      console.error('Failed to fetch access token:', response.status)
      await clearAccessToken()
      return null
    }

    const data = await response.json()

    await setAccessToken(data.access_token, 4.5 * 60 * 1000)
    return data.access_token
  }
  catch (err) {
    console.error('Error fetching access token:', err)
    await clearAccessToken()
    return null
  }
}

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
  }
  catch (e) {
    return null
  }
}

async function setAccessToken(token, expiresInMs = 5 * 60 * 1000) {
  const cache = await caches.open(TOKEN_CACHE_NAME)
  const data = {
    expiresAt: Date.now() + expiresInMs,
    token,
  }
  const response = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
  await cache.put('/access-token', response)
}

self.addEventListener('message', (event) => {
  const { payload, type } = event.data
  if (type === 'SET_PARAMS') {
    self.BACKEND_URL = DEFAULT_BACKEND_URL
    self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS || []
    console.log('SW params set:', { BACKEND_URL: self.BACKEND_URL })
  }
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return
  }

  if (!self.BACKEND_URL) {
    const isImage = request.destination === 'image'
    if (isImage) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          cache.match(request).then(cached => cached || fetch(request)),
        ),
      )
    }
    return
  }

  const isApiRequest = request.url.startsWith(self.BACKEND_URL)

  if (isApiRequest) {
    const pathname = url.pathname

    if (pathname.includes('/api/auth/logout')) {
      event.respondWith(
        (async () => {
          await clearAccessToken()
          return fetch(request)
        })(),
      )
      return
    }

    if (pathname.includes('/api/auth/')) {
      event.respondWith(fetch(request))
      return
    }

    event.respondWith(accessTokenMiddleware(request))
    return
  }

  const isImage = request.destination === 'image'
  const isAllowedPath = self.ALLOWED_CACHED_PATHS.some(path =>
    url.pathname.startsWith(path),
  )

  if (isImage && isAllowedPath) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          })
        }),
      ),
    )
    return
  }

  return
})
