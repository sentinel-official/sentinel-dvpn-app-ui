import { createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../services/app.services";
import {
  SET_SHOW_ERROR_ALERT,
  SHOW_RENEW_SUBSCRIPTION,
} from "../redux/alerts.reducer";

export const dispatchGetPlans = createAsyncThunk(
  "DISPATCH_GET_PLANS",
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const plans = await APIService.getPlans();
      const plan = plans.filter((p) => p.id === "6")[0];
      return fulfillWithValue(plan);
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch plans",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchFetchCurrentPrice = createAsyncThunk(
  "DISPATCH_FETCH_CURRENT_PRICE",
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const price = await APIService.getCurrentPrice();
      return fulfillWithValue(Number.parseFloat(price));
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch current price",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetBalance = createAsyncThunk(
  "DISPATCH_GET_BALANCE",
  async (walletAddress, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      let balance = 0;
      const balances = await APIService.getBalance(walletAddress);
      balances.forEach(async (balance) => {
        if (balance.denom === "udvpn") {
          balance = Number.parseInt(balance.amount) / 1e6;
        }
      });
      return fulfillWithValue(balance);
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch balance",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetIpAddress = createAsyncThunk(
  "DISPATCH_GET_IP_ADDRESS",
  async (deviceToken, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const resposnse = await APIService.getIpAddress(deviceToken);
      const { ip = "0.0.0.0", latitude = 0.0, longitude = 0.0 } = resposnse;
      return fulfillWithValue({ ip, latitude, longitude });
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch ip address or location",
        })
      );
      return rejectWithValue();
    }
  }
);

export const fetchMySubscriptions = createAsyncThunk(
  "FETCH_MY_SUBSCRIPTIONS",
  async (walletAddress, { dispatch, rejectWithValue, getState }) => {
    try {
      console.log(getState().account);
      let subscription;
      const response = await APIService.getSubscriptions(walletAddress);
      if (response && response.planSubscriptions) {
        subscription = response.planSubscriptions.find((subscription) => {
          return subscription.planId === "6";
        });
      }
      if (subscription) {
      } else {
        dispatch(SHOW_RENEW_SUBSCRIPTION(true));
        return rejectWithValue();
      }
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch your subscriptions",
        })
      );
      return rejectWithValue();
    }
  }
);

export const connectAction = createAsyncThunk(
  "CONNECT",
  async (_, { getState, fulfillWithValue, rejectWithValue, dispatch }) => {
    console.log(getState().account);

    const walletAddress = getState().device.walletAddress;
    APIService.getSubscriptions(walletAddress)
      .then((response) => {
        console.log("response", response);
        if (response && response.planSubscriptions) {
        } else {
          dispatch(SHOW_RENEW_SUBSCRIPTION(true));
        }
        // const subscriptions = response.data.planSubscriptions;
      })
      .catch(console.error);
  }
);

export const subscribeToPlanAction = createAsyncThunk(
  "SUBSCRIBE_TO_A_PLAN",
  async (payload, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await APIService.subscribeToPlan(6, payload);
      console.log("response", response);
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to fetch ip address or location",
        })
      );
      return rejectWithValue();
    }
  }
);
