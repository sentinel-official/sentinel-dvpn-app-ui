import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showSuccessAlert: false,
  showErrorAlert: false,
  message: "",
};
const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    SET_SHOW_SUCCESS_ALERT: (state, { payload }) => ({
      ...state,
      showSuccessAlert: payload.showSuccessAlert,
      message: payload.message,
    }),
    SET_SHOW_ERROR_ALERT: (state, { payload }) => ({
      ...state,
      showErrorAlert: payload.showErrorAlert,
      message: payload.message,
    }),
  },
});

export const { SET_SHOW_SUCCESS_ALERT, SET_SHOW_ERROR_ALERT } =
  alertsSlice.actions;
export default alertsSlice.reducer;
