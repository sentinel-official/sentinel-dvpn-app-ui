/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-globals */

const cacheVersion = "v1";

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== cacheVersion) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(cacheVersion).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch((error) => caches.match(event.request).then((res) => res))
  );
});
