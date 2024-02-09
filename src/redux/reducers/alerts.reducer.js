import { createSlice } from "@reduxjs/toolkit";
import {
  withLoader,
  withSingleDispatcherLoader,
} from "../../actions/loader.action";

const initialState = {
  success: {
    show: false,
    message: null,
  },
  error: {
    show: false,
    message: null,
  },
  loader: {
    show: false,
    message: null,
  },
  modal: {
    show: false,
    type: null,
  },
};

const alertsSlice = createSlice({
  name: "ALERTS",
  initialState,
  reducers: {
    CHANGE_SUCCESS_ALERT: (state, { payload }) => ({
      ...state,
      success: {
        ...state.success,
        ...payload,
      },
    }),
    CHANGE_ERROR_ALERT: (state, { payload }) => ({
      ...state,
      error: {
        ...state.error,
        ...payload,
      },
    }),
    CHANGE_LOADER_STATE: (state, { payload }) => ({
      ...state,
      loader: {
        ...state.loader,
        ...payload,
      },
    }),
    CHANGE_MODAL_STATE: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        ...payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(withLoader.pending, (state) => ({
        ...state,
        loader: { ...state.loader, show: true, message: "Loading..." },
      }))
      .addCase(withLoader.rejected, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }))
      .addCase(withLoader.fulfilled, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }));

    builder
      .addCase(withSingleDispatcherLoader.pending, (state) => ({
        ...state,
        loader: { ...state.loader, show: true, message: "Loading..." },
      }))
      .addCase(withSingleDispatcherLoader.rejected, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }))
      .addCase(withSingleDispatcherLoader.fulfilled, (state) => ({
        ...state,
        loader: { ...state.loader, show: false, message: null },
      }));
  },
});

export const {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
  CHANGE_SUCCESS_ALERT,
  CHANGE_MODAL_STATE,
} = alertsSlice.actions;

export default alertsSlice.reducer;
