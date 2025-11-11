const CACHE_NAME = 'image-cache-v1'
self.accessToken = undefined
self.BACKEND_URL = undefined
self.ALLOWED_CACHED_PATHS = []

self.addEventListener('message', (event) => {
  const { payload, type } = event.data
  if (type === 'SET_PARAMS') {
    self.BACKEND_URL = payload.BACKEND_URL
    self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS
  }
})

/**
 * Requests an access token using a refresh token
 */
const fetchAccessToken = async () => {
  console.log('token requested')

  try {
    const response = await fetch(`${self.BACKEND_URL}/api/auth/token`, {
      credentials: 'include',
      method: 'POST',
    })

    if (!response.ok) {
      console.error('Failed to fetch access token')
      return undefined
    }

    const data = await response.json()
    return data.access_token
  }
  catch (err) {
    console.error('Error fetching access token:', err)
    return undefined
  }
}

/**
 * When the access token is not present, this function will request a new one and set the value in headers
 */
const accessTokenMiddleware = async (request) => {
  if (request.headers.get('Authorization')) {
    return fetch(request)
  }

  if (self.accessToken === undefined) {
    self.accessToken = await fetchAccessToken()
  }

  if (!self.accessToken) {
    return fetch(request)
  }

  const modified = new Request(request, {
    headers: new Headers({
      ...Object.fromEntries(request.headers.entries()),
      Authorization: `Bearer ${self.accessToken}`,
    }),
  })

  let response = await fetch(modified)

  if (response.status === 401) {
    self.accessToken = await fetchAccessToken()

    if (!self.accessToken) {
      return response
    }

    const retryRequest = new Request(request, {
      headers: new Headers({
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${self.accessToken}`,
      }),
    })
    response = await fetch(retryRequest)
  }

  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  const pathname = url.pathname

  var isMustCached = false
  // Сhecks whether the result of the given path is cached.
  // for (const path of self.ALLOWED_CACHED_PATHS) {
  //   if (path && pathname.includes(path) && url.href.startsWith(origin)) {
  //     isMustCached = true;
  //   }
  // }
  if (isMustCached) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse

          return accessTokenMiddleware(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          })
        }),
      ),
    )
  }
  else if (request.url.startsWith(self.BACKEND_URL)) {
    if (url.pathname.includes('/api/auth/logout')) {
      event.respondWith(fetch(request))
      self.accessToken = undefined
    }
    else if (url.pathname.includes('/api/auth/')) {
      event.respondWith(fetch(request))
    }
    else {
      event.respondWith(accessTokenMiddleware(request))
    }
  }
  else {
    return
  }
})
