import { createAsyncThunk } from "@reduxjs/toolkit";
import proxyServices from "../services/proxy.services";
import blockchainServices from "../services/blockchain.services";
import {
  parseAccountBalance,
  parsePlans,
  parseSubscriptions,
} from "../helpers/data.parser";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import otherServices from "../services/other.services";

export const dispatchGetIPAddress = createAsyncThunk(
  "GET_IP_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching IP address..." }));

    try {
      const deviceToken = getState().device.deviceToken;
      const response = await proxyServices.getIpAddress(deviceToken);
      return fulfillWithValue(response);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to get IP Address" })
      );

      return rejectWithValue();
    }
  }
);

export const dispatchGetAccountBalance = createAsyncThunk(
  "GET_ACCOUNT_BALANCE",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching Account Balance..." }));
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getBalance(walletAddress);
      const balance = parseAccountBalance(response.balances);
      return fulfillWithValue(balance);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to get Balance" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetAvailablePlans = createAsyncThunk(
  "GET_AVAILABLE_PLANS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching Plans..." }));
    try {
      const response = await blockchainServices.getPlans();
      const plan = parsePlans(response);
      return fulfillWithValue(plan);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed to get Plans" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetUserSubscriptions = createAsyncThunk(
  "GET_USER_SUBSCRIPTIONS",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(CHANGE_LOADER_STATE({ message: "Fetching Subscriptions..." }));
    try {
      const walletAddress = getState().device.walletAddress;
      const response = await blockchainServices.getSubScriptions(walletAddress);
      const subscription = parseSubscriptions(response.planSubscriptions);
      return fulfillWithValue(subscription);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to get Subscriptions",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchCurrentPrice = createAsyncThunk(
  "GET_CURRENT_PRICE",
  async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      dispatch(CHANGE_LOADER_STATE({ message: "Fetching current price..." }));
      const price = await otherServices.getCurrentPrice();
      return fulfillWithValue(Number.parseFloat(price));
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to get current price",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchSubscribeToPlan = createAsyncThunk(
  "SUBSCRIBE_TO_PLAN",
  async (payload, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(CHANGE_LOADER_STATE({ message: "Renewing your Subscription" }));
      await blockchainServices.postSubscription(6, payload);
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to Subscribe",
        })
      );
      return rejectWithValue();
    }
  }
);
