import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchFetchCurrentPrice,
  dispatchGetBalance,
  dispatchGetIpAddress,
  dispatchGetPlans,
} from "../actions/user.actions";

const initialState = {
  balance: 0,
  price: 0,
  ip: "0.0.0.0",
  plan: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchGetPlans.fulfilled, (state, { payload }) => ({
      ...state,
      plan: payload,
    }));
    builder.addCase(
      dispatchFetchCurrentPrice.fulfilled,
      (state, { payload }) => ({
        ...state,
        price: payload,
      })
    );
    builder.addCase(dispatchGetBalance.fulfilled, (state, { payload }) => ({
      ...state,
      balance: payload,
    }));
    builder.addCase(dispatchGetIpAddress.fulfilled, (state, { payload }) => ({
      ...state,
      ip: payload.ip,
    }));
  },
});

export default accountSlice.reducer;
