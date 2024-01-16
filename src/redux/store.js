import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import alertsReducer from "./alerts.reducer";
import mapReducer from "./map.reducer";

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
import accountReducer from "./account.reducer";
import nodesReducer from "./nodes.reducer";
import deviceReducer from "./device.reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  safelist: ["device"],
};

const persistedUserReducer = persistReducer(persistConfig, deviceReducer);

const rootReducer = combineReducers({
  device: persistedUserReducer,
  user: userReducer,
  alerts: alertsReducer,
  map: mapReducer,
  account: accountReducer,
  nodes: nodesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
