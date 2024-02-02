import { createSlice } from "@reduxjs/toolkit";
import {
  createWalletMnemonic,
  fetchDeviceDetails,
  registerDevice,
} from "../actions/device.actions";
import { connectAction, disconnectAction } from "../actions/vpn.actions";
import { dispatchGetDNSTypes } from "../actions/user.actions";

const initialState = {
  deviceToken: null,
  walletAddress: null,
  mnemonic: null,
  availableDNS: [],
  currentDNS: {},
  selectedNode: {},
  isVPNConnected: false,
  isRegistered: false,
  protocol: "",
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    CHANGE_SELECTED_DNS: (state, { payload }) => ({
      ...state,
      currentDNS: payload,
    }),
    CHANGE_PROTOCOL: (state, { payload }) => ({
      ...state,
      protocol: payload,
    }),
    CHANGE_SELECTED_NODE: (state, { payload }) => ({
      ...state,
      selectedNode: payload,
    }),
    SET_IS_VPN_CONNECTED: (state, { payload }) => ({
      ...state,
      isVPNConnected: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeviceDetails.fulfilled, (state, { payload }) => ({
      ...state,
      deviceToken: payload.deviceToken,
      walletAddress: payload.walletAddress,
      isRegistered: true,
    }));
    builder.addCase(registerDevice.fulfilled, (state, { payload }) => ({
      ...state,
      deviceToken: payload.deviceToken,
      walletAddress: payload.walletAddress,
      isRegistered: true,
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
    builder.addCase(dispatchGetDNSTypes.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }));
  },
});

export const {
  CHANGE_SELECTED_DNS,
  CHANGE_SELECTED_NODE,
  SET_IS_VPN_CONNECTED,
  CHANGE_PROTOCOL,
} = deviceSlice.actions;

export default deviceSlice.reducer;
