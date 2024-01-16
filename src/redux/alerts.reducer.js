import { createSlice } from "@reduxjs/toolkit";
import { withLoader } from "../actions/loader.actions";
const initialState = {
  showSuccessAlert: false,
  showErrorAlert: false,
  message: "",
  loadingMessage: "",
  isLoading: false,
  showRenewSubscription: false,
  isUserDetailsFetched: false,
  isShowNoBalance: false,
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
    SET_LOADING_MESSAGE: (state, { payload }) => ({
      ...state,
      loadingMessage: payload,
    }),
    SHOW_RENEW_SUBSCRIPTION: (state, { payload }) => ({
      ...state,
      showRenewSubscription: payload,
    }),
    SET_USER_DETAILS_FETCHED: (state, { payload }) => ({
      ...state,
      isUserDetailsFetched: payload,
    }),
    SHOW_NO_BALANCE: (state, { payload }) => ({
      ...state,
      isShowNoBalance: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(withLoader.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(withLoader.rejected, (state) => ({
        ...state,
        isLoading: false,
        loadingMessage: "",
      }))
      .addCase(withLoader.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        loadingMessage: "",
      }));
  },
});

export const {
  SET_SHOW_SUCCESS_ALERT,
  SET_SHOW_ERROR_ALERT,
  SET_LOADING_MESSAGE,
  SHOW_RENEW_SUBSCRIPTION,
  SET_USER_DETAILS_FETCHED,
  SHOW_NO_BALANCE,
} = alertsSlice.actions;
export default alertsSlice.reducer;
