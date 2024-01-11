import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceToken: null,
  walletAddress: null,
  mnemonic: null,
  isLoading: true,
  isOnboarding: false,
  ip: null,
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
    SET_MNEMONIC: (state, { payload }) => ({
      ...state,
      mnemonic: payload,
    }),
    SET_IS_ONBOARDING: (state, { payload }) => ({
      ...state,
      isOnboarding: payload,
    }),
    SET_IP_ADDRESS: (state, { payload }) => ({
      ...state,
      ip: payload,
    }),
  },
});

export const {
  SET_USER_DETAILS,
  SET_LOADING,
  SET_MNEMONIC,
  SET_IS_ONBOARDING,
  SET_IP_ADDRESS,
} = userSlice.actions;

export default userSlice.reducer;
