import { createAsyncThunk } from "@reduxjs/toolkit";
import blockchainServices from "../services/blockchain.services";

import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";

export const createWalletWithMnemonic = createAsyncThunk(
  "CREATE_WALLET_WITH_MNEMONIC",
  async (mnemonic, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "Creating Wallet..." })
    );
    try {
      await blockchainServices.postWalletAddress({ mnemonic });
      return fulfillWithValue(mnemonic);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to Create Wallet" })
      );
      return rejectWithValue(e);
    }
  }
);


export const getWalletAddressAction = createAsyncThunk(
  "FETCH_WALLET_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "Fetching Wallet Address..." })
    );

    try {
      const address = await blockchainServices.getWalletAddress();
      return fulfillWithValue(address.address);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to fetch wallet address",
        })
      );
      return rejectWithValue();
    }
  }
);
