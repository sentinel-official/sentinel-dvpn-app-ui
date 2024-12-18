import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

registerRoute(
  ({ url }) =>
    url.origin === "https://flagcdn.com" && url.pathname.endsWith(".svg"),
  new StaleWhileRevalidate({
    cacheName: "flags",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

export const register = async () => {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.register("service-worker.js");
  } else {
    console.log("NO SERVICE WORKER");
    return;
  }
};

export const unregister = async () => {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        if (registrations.length > 0) {
          console.log("Service Workers found. Unregistering...");
          registrations.forEach(function (registration) {
            registration.unregister().then(function () {
              console.log("Service Worker unregistered:", registration);
            });
          });
        } else {
          console.log("No Service Workers found.");
        }
      })
      .catch(function (error) {
        console.error("Error getting service worker registrations:", error);
      });
  } else {
    console.log("Service Workers are not supported in this browser.");
    return;
  }
};
