import { parseAccountBalance } from "@helpers/parse.data";
import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "@services/auth.services";
import otherServices from "@services/other.services";
import getFeeGrantDetails from "../helpers/getFeeGrantDetails";

export const dispatchFetchAccountBalance = createAsyncThunk("USER/FETCH_ACCOUNT_BALANCE", async (walletAddress, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const response = await authServices.fetchAccountBalance(walletAddress);
    const balance = parseAccountBalance(response.balances);
    return fulfillWithValue(balance);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_fetching_acc_bal`,
        data: { error: e.message },
      })
    );
    return rejectWithValue();
  }
});

export const dispatchFetchTokenPrice = createAsyncThunk("USER/FETCH_TOKEN_PRICE", async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
  try {
    const response = await otherServices.fetchCurrentPrice();
    return fulfillWithValue(response);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_fetching_price`,
        data: { error: e.message },
      })
    );
    return rejectWithValue();
  }
});

export const dispatchRegisterWalletAddress = createAsyncThunk("USER/REGISTER_WALLET_ADDRESS", async (walletAddress, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
  try {
    const referredBy = getState().referral.referredBy;
    const isWalletRegistered = getState().loader.isWalletRegistered;
    if (isWalletRegistered) {
      return fulfillWithValue(true);
    }
    await authServices.registerWalletAddress(walletAddress, referredBy);
    return fulfillWithValue(true);
  } catch (e) {
    dispatch(
      ADD_NEW_ALERT({
        type: ALERT_TYPES.error,
        message: `error_register_wallet`,
        data: { error: e.message },
      })
    );
    return rejectWithValue(false);
  }
});

export const dispatchGetFeeGrantDetails = createAsyncThunk("USER/FEE_GRANT_DETAILS", async ({ walletAddress, feeGrantEnabled = true }, { fulfillWithValue, dispatch }) => {
  try {
    if (feeGrantEnabled) {
      const resp = await getFeeGrantDetails(walletAddress, dispatch);
      if (resp) {
        return fulfillWithValue(true);
      }
      return fulfillWithValue(false);
    }
    return fulfillWithValue(true);
  } catch (e) {
    return fulfillWithValue(false);
  }
});
