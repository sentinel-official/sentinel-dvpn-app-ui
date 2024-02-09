import { createAsyncThunk } from "@reduxjs/toolkit";
import registryServices from "../services/registry.services";
import blockchainServices from "../services/blockchain.services";
import proxyServices from "../services/proxy.services";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";

export const createWalletWithMnemonic = createAsyncThunk(
  "CREATE_WALLET_WITH_MNEMONIC",
  async (mnemonic, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Creating Wallet..." }));
    try {
      await blockchainServices.postWalletAddress({ mnemonic });
      return fulfillWithValue(mnemonic);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getDeviceTokenAction = createAsyncThunk(
  "FETCH_DEVICE_TOKEN",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching Device Token..." }));

    try {
      const token = await registryServices.getKey("deviceToken");
      return fulfillWithValue(token.value);
    } catch (e) {
      try {
        const device = await proxyServices.postDevice();
        const token = device.data.token;
        const payload = {
          key: "deviceToken",
          value: token,
          is_secure: true,
        };
        await registryServices.setKey(payload);
        return fulfillWithValue(token);
      } catch (e) {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "Failed to get device token",
          })
        );
        return rejectWithValue(e);
      }
    }
  }
);

export const getWalletAddressAction = createAsyncThunk(
  "FETCH_WALLET_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching Wallet Address..." }));

    try {
      const address = await blockchainServices.getWalletAddress();
      return fulfillWithValue(address.address);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to get wallet address",
        })
      );
      return rejectWithValue();
    }
  }
);
