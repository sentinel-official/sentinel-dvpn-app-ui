import { createSlice } from "@reduxjs/toolkit";
import dnsList from "../constants/dns.constants";
import { dispatchGetIpAddress } from "../actions/user.actions";
import {
  createWalletMnemonic,
  fetchDeviceDetails,
} from "../actions/device.actions";
import { connectAction, disconnectAction } from "../actions/vpn.actions";

const initialState = {
  deviceToken: null,
  walletAddress: null,
  mnemonic: null,
  selectedDNS: dnsList.cloudflare,
  ip: "0.0.0.0",
  selectedNode: {},
  isVPNConnected: false,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    CHANGE_SELECTED_DNS: (state, { payload }) => ({
      ...state,
      selectedDNS: payload,
    }),
    CHANGE_SELECTED_NODE: (state, { payload }) => ({
      ...state,
      selectedNode: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeviceDetails.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
    builder.addCase(dispatchGetIpAddress.fulfilled, (state, { payload }) => ({
      ...state,
      ip: payload.ip,
    }));

    builder.addCase(createWalletMnemonic.fulfilled, (state, { payload }) => ({
      ...state,
      mnemonic: payload,
    }));
    builder.addCase(connectAction.fulfilled, (state) => ({
      ...state,
      isVPNConnected: true,
    }));
    builder.addCase(disconnectAction.fulfilled, (state) => ({
      ...state,
      isVPNConnected: false,
    }));
  },
});

export const { CHANGE_SELECTED_DNS, CHANGE_SELECTED_NODE } =
  deviceSlice.actions;

export default deviceSlice.reducer;
