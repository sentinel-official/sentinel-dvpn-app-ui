import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import alertsReducer from "./alerts.reducer";
import mapReducer from "./map.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertsReducer,
  map: mapReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
