import { createSlice } from "@reduxjs/toolkit";
import dnsList from "../constants/dns.constants";

const initialState = {
  deviceToken: null,
  walletAddress: null,
  mnemonic: null,
  isLoading: true,
  isOnboarding: false,
  selectedDNS: dnsList.cloudflare,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_DETAILS: (state, { payload }) => ({
      ...state,
      walletAddress: payload.address,
      deviceToken: payload.value,
    }),
    SET_LOADING: (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }),
    SET_IS_ONBOARDING: (state, { payload }) => ({
      ...state,
      isOnboarding: payload,
    }),
    CHANGE_SELECTED_DNS: (state, { payload }) => ({
      ...state,
      selectedDNS: payload,
    }),
  },
});

export const {
  SET_USER_DETAILS,
  SET_LOADING,
  SET_IS_ONBOARDING,
  CHANGE_SELECTED_DNS,
} = userSlice.actions;

export default userSlice.reducer;
