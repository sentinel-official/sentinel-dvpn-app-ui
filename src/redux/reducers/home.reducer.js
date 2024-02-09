import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchCurrentPrice,
  dispatchGetAccountBalance,
  dispatchGetAvailablePlans,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
} from "../../actions/home.actions";

const initialState = {
  balance: 0.0,
  price: 0.0,
  ip: "0.0.0.0",
  latitude: 0.0,
  longitude: 0.0,
  plan: {
    amount: 0,
    providerAddress: null,
    denom: "udvpn",
  },
  subscription: {},
};

const homeSlice = createSlice({
  name: "HOME",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchGetIPAddress.fulfilled, (state, { payload }) => ({
      ...state,
      ip: payload.ip,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }));
    builder.addCase(
      dispatchGetAccountBalance.fulfilled,
      (state, { payload }) => ({
        ...state,
        balance: payload,
      })
    );
    builder.addCase(
      dispatchGetAvailablePlans.fulfilled,
      (state, { payload }) => ({
        ...state,
        plan: {
          ...state.plan,
          ...payload,
        },
      })
    );
    builder.addCase(
      dispatchGetUserSubscriptions.fulfilled,
      (state, { payload }) => ({
        ...state,
        subscription: payload,
      })
    );
    builder.addCase(dispatchCurrentPrice.fulfilled, (state, { payload }) => ({
      ...state,
      price: payload,
    }));
  },
});

export default homeSlice.reducer;
