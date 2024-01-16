import { createAsyncThunk } from "@reduxjs/toolkit";
import { SET_SHOW_ERROR_ALERT } from "../redux/alerts.reducer";
import APIService from "../services/app.services";

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
      const response = await Promise.all([
        await APIService.getKey("deviceToken"),
        await APIService.getWallet(),
      ]);
      const [token, address] = response;
      return fulfillWithValue({
        deviceToken: token.value,
        walletAddress: address.address,
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
