import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  price: 0,
  ip: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    SET_ACCOUNT_BALANCE: (state, { payload }) => ({
      ...state,
      balance: payload,
    }),
    SET_USD_PRICE: (state, { payload }) => ({
      ...state,
      price: payload,
    }),
    SET_IP_ADDRESS: (state, { payload }) => ({
      ...state,
      ip: payload,
    }),
  },
});

export const { SET_ACCOUNT_BALANCE, SET_USD_PRICE, SET_IP_ADDRESS } =
  accountSlice.actions;

export default accountSlice.reducer;
