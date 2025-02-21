import { createSlice } from "@reduxjs/toolkit";
import { CHANGE_AUTH_STATUS } from "./auth.reducer";
import { dispatchRegisterWalletAddress } from "@actions/auth.actions";

const initialState = {
  loading: false,
  message: "Loading...",
  description: "",
  data: {},
  isHomeLoaded: false,
  title: "",
  canGoBack: false,
  isWalletRegistered: false,
  isFeegrantChecked: false,
  loadingApp: true,
};

const slice = createSlice({
  name: "LOADER",
  initialState,
  reducers: {
    CHANGE_LOADING_APP: (state, { payload }) => ({ ...state, loadingApp: payload }),
    START_LOADER: (state, { payload }) => ({
      ...state,
      loading: true,
      message: payload.message || "",
      description: payload.description || "",
      data: payload.data || {},
    }),
    CHANGE_MESSAGE: (state, { payload }) => ({
      ...state,
      loading: true,
      message: payload.message || state.message,
      description: payload.description || state.description,
    }),
    STOP_LOADER: (state) => ({
      ...state,
      loading: false,
      message: "",
      description: "",
    }),
    SET_HOME_LOADED: (state, { payload }) => ({
      ...state,
      isHomeLoaded: payload,
    }),
    CHANGE_LIST_TITLE: (state, { payload }) => ({
      ...state,
      title: payload.title,
      canGoBack: payload.canGoBack,
    }),
    SET_FEEGRANT_CHECKED: (state, { payload }) => ({
      ...state,
      isFeegrantChecked: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(CHANGE_AUTH_STATUS, (state) => ({ ...state, ...initialState }));

    builder.addCase(dispatchRegisterWalletAddress.fulfilled, (state) => ({
      ...state,
      isWalletRegistered: true,
    }));
  },
});

export const { START_LOADER, STOP_LOADER, CHANGE_MESSAGE, SET_HOME_LOADED, CHANGE_LIST_TITLE, SET_FEEGRANT_CHECKED, CHANGE_LOADING_APP } = slice.actions;

export default slice.reducer;
