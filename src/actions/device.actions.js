import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SET_SHOW_ERROR_ALERT,
  SET_USER_DETAILS_FETCHED,
} from "../redux/alerts.reducer";
import APIService from "../services/app.services";
import {
  dispatchFetchCurrentPrice,
  dispatchGetBalance,
  dispatchGetIpAddress,
  dispatchGetPlans,
  dispatchGetSubscriptions,
} from "./user.actions";
import { fetchCountriesAction } from "./nodes.actions";
import { withLoader } from "./loader.actions";

export const createWalletMnemonic = createAsyncThunk(
  "CREATE_WALLET_MNEMONIC",
  async (mnemonic, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await APIService.setWallet({ mnemonic });
      return fulfillWithValue(mnemonic);
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Error while creating wallet",
        })
      );
      return rejectWithValue();
    }
  }
);

export const fetchDeviceDetails = createAsyncThunk(
  "FETCH_DEVICE_DETAILS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const token = await APIService.getKey("deviceToken");
      const address = await APIService.getWallet();
      return fulfillWithValue({
        deviceToken: token.value || null,
        walletAddress: address.address || null,
      });
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Error while fetching",
        })
      );
      dispatch(
        withLoader({
          dispatchers: [registerDevice()],
          message: "Registering Device",
        })
      );
      return rejectWithValue();
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "FETCH_USER_DETAILS",
  async ({ walletAddress, deviceToken }, { dispatch }) => {
    try {
      await dispatch(dispatchGetPlans());
      await dispatch(fetchCountriesAction());
      await dispatch(dispatchFetchCurrentPrice());
      await dispatch(dispatchGetBalance(walletAddress));
      await dispatch(dispatchGetIpAddress(deviceToken));
      await dispatch(dispatchGetSubscriptions(walletAddress));
      dispatch(SET_USER_DETAILS_FETCHED(true));
    } catch (error) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Error while fetching",
        })
      );
    }
  }
);

export const registerDevice = createAsyncThunk(
  "REGISTER_USER_DEVICE",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const device = await APIService.registerDevice();
      const token = device.data.token;

      const payload = {
        key: "deviceToken",
        value: token,
        is_secure: true,
      };

      await APIService.setKey(payload);
      const address = await APIService.getWallet();
      return fulfillWithValue({
        deviceToken: token || null,
        walletAddress: address.address || null,
      });
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Error while fetching device details",
        })
      );
      return rejectWithValue();
    }
  }
);
