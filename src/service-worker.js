/* eslint-disable no-restricted-globals */

const CACHE_NAME = "my-cache";
const globPattern = "*.{jpg,css,js,html}";

self.addEventListener("install", (event) => {
  event.waitUntil(
    fetchResources(globPattern).then((resourcesToCache) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(resourcesToCache);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

const fetchResources = async (globPattern) => {
  const resourcesToCache = [];
  const urls = await self.registration.scope.match(globPattern);

  for (const url of urls) {
    resourcesToCache.push(url.toString());
  }

  return resourcesToCache;
};
