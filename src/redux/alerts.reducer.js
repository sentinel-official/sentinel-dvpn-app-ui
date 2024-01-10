import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSnakAlert: false,
  message: "",
};
const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    SET_SHOW_SNAK_ALERT: (state, { payload }) => ({
      ...state,
      showSnakAlert: payload.showSnakAlert,
      message: payload.message,
    }),
  },
});

export const { SET_SHOW_SNAK_ALERT } = alertsSlice.actions;
export default alertsSlice.reducer;
