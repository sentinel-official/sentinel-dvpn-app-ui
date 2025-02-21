import {
  dispatchFetchAccountBalance,
  dispatchFetchTokenPrice,
} from "@actions/auth.actions";
import { dispatchChangeDNS } from "@actions/settings.actions";
import {
  dispatchFetchApplicationVersion,
  dispatchFetchAvailablePlans,
  dispatchFetchAvailableSubscriptions,
  dispatchFetchCurrentDNS,
  dispatchFetchCurrentRPC,
} from "@actions/user.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  price: 0,
  subscription: {},
  plan: {},
  isPlansFetched: false,
  isSubscriptionFetched: false,
  app: {
    version: "0.0.0",
    isLatestAvailable: false,
    latestVersion: "0.0.0",
  },
  rpc: {},
  dns: {},
};

const slice = createSlice({
  name: "USER",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(
      dispatchFetchApplicationVersion.fulfilled,
      (state, { payload }) => ({
        ...state,
        app: {
          ...state.app,
          version: payload.version || "0.0.0",
          latestVersion: payload.latestVersion || "0.0.0",
          isLatestAvailable: payload.isLatestAvailable || false,
        },
      })
    );
    builder.addCase(
      dispatchFetchAccountBalance.fulfilled,
      (state, { payload }) => ({ ...state, balance: payload || 0 })
    );
    builder.addCase(
      dispatchFetchTokenPrice.fulfilled,
      (state, { payload }) => ({ ...state, price: payload || 0 })
    );

    builder.addCase(
      dispatchFetchCurrentRPC.fulfilled,
      (state, { payload }) => ({ ...state, rpc: payload })
    );
    builder.addCase(
      dispatchFetchCurrentDNS.fulfilled,
      (state, { payload }) => ({ ...state, dns: payload })
    );
    builder.addCase(dispatchChangeDNS.fulfilled, (state, { payload }) => ({
      ...state,
      dns: payload,
    }));

    builder
      .addCase(dispatchFetchAvailablePlans.rejected, (state) => ({
        ...state,
        isPlansFetched: false,
      }))
      .addCase(dispatchFetchAvailablePlans.fulfilled, (state, { payload }) => ({
        ...state,
        plan: payload,
        isPlansFetched: true,
      }));

    builder
      .addCase(dispatchFetchAvailableSubscriptions.rejected, (state) => ({
        ...state,
        isSubscriptionFetched: false,
      }))
      .addCase(
        dispatchFetchAvailableSubscriptions.fulfilled,
        (state, { payload }) => ({
          ...state,
          subscription: payload,
          isSubscriptionFetched: true,
        })
      );
  },
});

export default slice.reducer;
