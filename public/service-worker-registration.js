/* eslint-disable no-unused-vars */

const register = () => {
  const swUrl = `/service-worker.js`;
  window.addEventListener("load", () => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                console.log("SERVICE WORKER INSTALLED");
              } else {
                console.log("SERVICE WORKER FAILED INSTALLED");
              }
            };
          };
        })
        .catch(console.error);
    }
  });
};
