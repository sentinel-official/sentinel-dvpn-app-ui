import { createSlice } from "@reduxjs/toolkit";
import {
  createWalletWithMnemonic,
  getDeviceTokenAction,
  getWalletAddressAction,
} from "../../actions/onboarding.action";
import {
  connectAction,
  disconnectAction,
  dispatchGetVPNStatus,
} from "../../actions/vpn.actions";

const initialState = {
  isWalletCreated: false,
  isRegistered: false,
  walletAddress: null,
  deviceToken: null,
  selectedNode: {},
  isHomeLoaded: false,
  isVPNConnected: false,
  protocols: "V2RAY,WIREGUARD",
};

const deviceSlice = createSlice({
  name: "DEVICE",
  initialState,
  reducers: {
    CHANGE_IS_HOME_LOADED: (state) => ({
      ...state,
      isHomeLoaded: true,
    }),
    CHANGE_IS_REGISTERED: (state, { payload }) => ({
      ...state,
      isRegistered: payload,
    }),
    SET_PROTOCOL: (state, { payload }) => ({
      ...state,
      protocols: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      createWalletWithMnemonic.fulfilled,
      (state, { payload }) => ({
        ...state,
        isWalletCreated: true,
        mnemonic: payload,
      })
    );
    builder.addCase(dispatchGetVPNStatus.fulfilled, (state, { payload }) => ({
      ...state,
      isVPNConnected: payload,
    }));
    builder.addCase(getDeviceTokenAction.fulfilled, (state, { payload }) => ({
      ...state,
      deviceToken: payload,
    }));
    builder.addCase(getWalletAddressAction.fulfilled, (state, { payload }) => ({
      ...state,
      walletAddress: payload,
    }));
    builder.addCase(connectAction.fulfilled, (state, { payload }) => ({
      ...state,
      selectedNode: payload.node,
    }));
    builder.addCase(disconnectAction.fulfilled, (state, { payload }) => ({
      ...state,
      isVPNConnected: payload,
    }));
  },
});

export const { CHANGE_IS_HOME_LOADED, CHANGE_IS_REGISTERED, SET_PROTOCOL } =
  deviceSlice.actions;

export default deviceSlice.reducer;
