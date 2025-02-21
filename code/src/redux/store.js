import {
  alertsReducer,
  deviceReducer,
  authReducer,
  settingsReducer,
  tunnelReducer,
  loaderReducer,
  nodesReducer,
  vpnReducer,
  userReducer,
} from "@reducers";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import process from "process";
import paymentsReducer from "@reducers/payments.reducer";

const persistConfig = {
  device: {
    key: "device",
    version: 1,
    storage,
    safelist: ["device"],
  },
  auth: {
    key: "auth",
    version: 1,
    storage,
    safelist: ["auth"],
  },
  settings: {
    key: "settings",
    version: 1,
    storage,
    safelist: ["settings"],
  },
};

const persistedReducers = {
  auth: persistReducer(persistConfig.auth, authReducer),
  device: persistReducer(persistConfig.device, deviceReducer),
  settings: persistReducer(persistConfig.settings, settingsReducer),
};

const reducer = combineReducers({
  auth: persistedReducers.auth,
  device: persistedReducers.device,
  settings: persistedReducers.settings,
  loader: loaderReducer,
  alerts: alertsReducer,
  nodes: nodesReducer,
  user: userReducer,
  vpn: vpnReducer,
  payments: paymentsReducer,
  tunnel: tunnelReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV == "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
