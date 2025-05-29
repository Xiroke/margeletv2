const CACHE_NAME = "image-cache-v1";
self.accessToken = null;
self.BACKEND_URL = null;
self.ALLOWED_ORIGINS = [];
self.ALLOWED_CACHED_PATHS = [];

self.addEventListener("message", (event) => {
  const { type, payload } = event.data;
  if (type === "SET_PARAMS") {
    self.BACKEND_URL = payload.BACKEND_URL;
    self.ALLOWED_ORIGINS = payload.ALLOWED_ORIGINS;
    self.ALLOWED_CACHED_PATHS = payload.ALLOWED_CACHED_PATHS;
  }
});

const accessTokenMiddleware = async (request) => {
  // request access token from api when we get a 401 code
  // in other cases we set the access token in the request headers
  console.log(self.BACKEND_URL);
  const fetchAccessToken = async () => {
    const response = await fetch(`${self.BACKEND_URL}/api/auth/access_token`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Failed to fetch access token");
      return;
    }

    const data = await response.json();
    return data.access_token;
  };

  const modified = new Request(request, {
    headers: new Headers({
      ...Object.fromEntries(request.headers.entries()),
      Authorization: `Bearer ${self.accessToken}`,
    }),
  });

  const response = await fetch(modified);

  if (response.status === 401) {
    self.accessToken = await fetchAccessToken();
    return fetch(
      new Request(request, {
        headers: new Headers({
          ...Object.fromEntries(request.headers.entries()),
          Authorization: `Bearer ${self.accessToken}`,
        }),
      })
    );
  }

  return response;
};

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

          return accessTokenMiddleware(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
      )
    );
  } else if (!isAllowed && request.url.startsWith(self.BACKEND_URL)) {
    // for all query to backend
    event.respondWith(accessTokenMiddleware(request));
  }
});
