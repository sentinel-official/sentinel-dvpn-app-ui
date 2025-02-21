import {
  dispatchConnectToVPN,
  dispatchDisconnectFromVPN,
  dispatchFetchConnectionStatus,
  dispatchFetchIPAddress,
} from "@actions/vpn.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnecting: false,
  isConnected: false,
  ipAddress: "0.0.0.0",
  latitude: 0.0,
  longitude: 0.0,
};

const slice = createSlice({
  name: "VPN",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(dispatchConnectToVPN.pending, (state) => ({
        ...state,
        isConnecting: true,
      }))
      .addCase(dispatchConnectToVPN.rejected, (state) => ({
        ...state,
        isConnecting: false,
        isConnected: false,
      }))
      .addCase(dispatchConnectToVPN.fulfilled, (state, { payload }) => ({
        ...state,
        isConnecting: false,
        isConnected: payload.isConnected || state.isConnected,
        latitude: payload.node.latitude,
        longitude: payload.node.longitude,
      }));
    builder.addCase(dispatchFetchIPAddress.fulfilled, (state, { payload }) => ({
      ...state,
      ipAddress: payload.ipAddress,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }));
    builder.addCase(
      dispatchFetchConnectionStatus.fulfilled,
      (state, { payload }) => ({
        ...state,
        isConnecting: false,
        isConnected: payload,
      })
    );
    builder.addCase(
      dispatchDisconnectFromVPN.fulfilled,
      (state, { payload }) => ({
        ...state,
        isConnecting: false,
        isConnected: payload,
      })
    );
  },
});

export default slice.reducer;
