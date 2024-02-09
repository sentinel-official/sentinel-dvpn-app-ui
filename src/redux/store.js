import { combineReducers, configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./reducers/device.reducer";
import alertsReducer from "./reducers/alerts.reducer";
import dnsReducer from "./reducers/dns.reducer";

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
import homeReducer from "./reducers/home.reducer";
import nodesReducer from "./reducers/nodes.reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  safelist: ["device"],
};

const persistedReducer = persistReducer(persistConfig, deviceReducer);

const reducer = combineReducers({
  alerts: alertsReducer,
  device: persistedReducer,
  dns: dnsReducer,
  home: homeReducer,
  nodes: nodesReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
