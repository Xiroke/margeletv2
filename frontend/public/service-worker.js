const CACHE_NAME = "image-cache-v1";
self.ALLOWED_ORIGINS = [];
self.ALLOWED_CACHED_PATHS = [];

self.addEventListener("message", (event) => {
  const { type, payload } = event.data;
  if (type === "SET_PARAMS") {
    self.ALLOWED_ORIGINS = payload.ALLOWED_ORIGINS;
    self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS;
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  const isAllowed = self.ALLOWED_ORIGINS.some((origin) => {
    const pathname = url.pathname;

    for (const path of self.ALLOWED_CACHED_PATHS) {
      if (pathname.includes(path) && url.href.startsWith(origin)) {
        return true;
      }
    }
    return false;
  });
  if (isAllowed) {
    //caching images
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
      )
    );
  }
});
