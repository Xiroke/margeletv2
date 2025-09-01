const CACHE_NAME = 'image-cache-v1';
self.accessToken = null;
self.BACKEND_URL = null;
self.ALLOWED_ORIGINS = [];
self.ALLOWED_CACHED_PATHS = [];

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  console.log('[SW] message received:', type, payload);
  if (type === 'SET_PARAMS') {
    self.BACKEND_URL = payload.BACKEND_URL;
    self.ALLOWED_ORIGINS = payload.ALLOWED_ORIGINS;
    self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS;
  }
});

const fetchAccessToken = async () => {
  try {
    const response = await fetch(`${self.BACKEND_URL}/api/auth/access_token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('Failed to fetch access token');
      return null;
    }

    const data = await response.json();
    return data.access_token ?? null;
  } catch (err) {
    console.error('Error fetching access token:', err);
    return null;
  }
};

const accessTokenMiddleware = async (request) => {
  if (request.headers.get('Authorization') !== null) {
    return fetch(request);
  }

  if (self.accessToken === null) {
    self.accessToken = await fetchAccessToken();
  }

  if (!self.accessToken) {
    return fetch(request);
  }

  const modified = new Request(request, {
    headers: new Headers({
      ...Object.fromEntries(request.headers.entries()),
      Authorization: `Bearer ${self.accessToken}`,
    }),
  });

  let response = await fetch(modified);

  if (response.status === 401) {
    self.accessToken = await fetchAccessToken();
    if (!self.accessToken) {
      return response;
    }
    const retryRequest = new Request(request, {
      headers: new Headers({
        ...Object.fromEntries(request.headers.entries()),
        Authorization: `Bearer ${self.accessToken}`,
      }),
    });
    response = await fetch(retryRequest);
  }

  return response;
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  const isAllowed = self.ALLOWED_ORIGINS.some((origin) => {
    const pathname = url.pathname;
    for (const path of self.ALLOWED_CACHED_PATHS) {
      if (path && pathname.includes(path) && url.href.startsWith(origin)) {
        return true;
      }
    }
  });

  if (isAllowed) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return accessTokenMiddleware(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        }),
      ),
    );
  } else if (request.url.startsWith(self.BACKEND_URL)) {
    if (url.pathname.includes('/api/auth/')) {
      event.respondWith(fetch(request));
    } else {
      event.respondWith(accessTokenMiddleware(request));
    }
  } else {
    return;
  }
});
