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
      const token = await APIService.getKey("deviceToken");
      const address = await APIService.getWallet();
      console.log(token, address);
      return fulfillWithValue({
        deviceToken: token.value || null,
        walletAddress: address.address || null,
      });
    } catch (e) {
      console.log("error", e);
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
