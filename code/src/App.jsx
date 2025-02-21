import React, { Suspense } from "react";
import { Provider as StoreProvider } from "react-redux";
import store, { persistor } from "@store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Alerts, Loader, Modal } from "./components";

const TranslationsProvider = React.lazy(() => import("./TranslationsProvider"));
const Navigator = React.lazy(() => import("@navigation/Navigator"));

const App = () => {
  const isPortrait = React.useMemo(() => {
    if (window.innerHeight >= 320) {
      return true;
    }
    return false;
  }, [window.screen.orientation.type, window.innerHeight]);

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <TranslationsProvider>
              {isPortrait && (
                <>
                  <Navigator />
                  <Loader />
                  <Alerts />
                  <Modal />
                </>
              )}
            </TranslationsProvider>
          </PersistGate>
        </StoreProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
