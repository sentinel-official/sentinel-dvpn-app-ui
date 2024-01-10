import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.reducer";
import alertsReducer from "./alerts.reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    alerts: alertsReducer,
  },
});

export default store;
