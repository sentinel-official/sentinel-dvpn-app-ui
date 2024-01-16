import { createSlice } from "@reduxjs/toolkit";
import dnsList from "../constants/dns.constants";
import { dispatchGetIpAddress } from "../actions/user.actions";
import {
  createWalletMnemonic,
  fetchDeviceDetails,
} from "../actions/device.actions";

const initialState = {
  deviceToken: null,
  walletAddress: null,
  mnemonic: null,
  selectedDNS: dnsList.cloudflare,
  ip: "0.0.0.0",
  selectedNode: {},
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
  },
});

export const { CHANGE_SELECTED_DNS, CHANGE_SELECTED_NODE } =
  deviceSlice.actions;

export default deviceSlice.reducer;
