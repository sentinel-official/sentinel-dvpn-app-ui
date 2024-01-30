import { createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../services/app.services";
import {
  SET_LOADING_MESSAGE,
  SET_SHOW_ERROR_ALERT,
  SHOW_NO_BALANCE,
  SHOW_RENEW_SUBSCRIPTION,
} from "../redux/alerts.reducer";
import { withLoader } from "./loader.actions";
import { sortObjArrByKey } from "../helpers/parseData";
import { CHANGE_SELECTED_DNS } from "../redux/device.reducer";

export const dispatchGetPlans = createAsyncThunk(
  "DISPATCH_GET_PLANS",
  async (_, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      dispatch(SET_LOADING_MESSAGE("Fetching Plans"));

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
      dispatch(SET_LOADING_MESSAGE("Fetching Current Price"));

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
      dispatch(SET_LOADING_MESSAGE("Fetching Balance"));

      let amount = 0;
      const response = await APIService.getBalance(walletAddress);
      response &&
        response.balances &&
        response.balances.forEach(async (balance) => {
          if (balance.denom === "udvpn") {
            amount = Number.parseInt(balance.amount) / 1e6;
          }
        });
      if (amount === 0) {
        dispatch(SHOW_NO_BALANCE(true));
      }
      return fulfillWithValue(amount);
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
      dispatch(SET_LOADING_MESSAGE("Fetching IP Address"));

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

export const dispatchGetSubscriptions = createAsyncThunk(
  "DISPATCH_GET_SUBSCRIPTIONS",
  async (walletAddress, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      dispatch(SET_LOADING_MESSAGE("Fetching Subscriptions"));

      const response = await APIService.getSubscriptions(walletAddress);
      if (response && response.planSubscriptions) {
        const subscription = response.planSubscriptions.find((subscription) => {
          return subscription.planId === "6";
        });
        return fulfillWithValue(subscription);
      }
      return rejectWithValue();
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const dispatchGetDNSTypes = createAsyncThunk(
  "GET_DNS_TYPES",
  async (_, { rejectWithValue, fulfillWithValue, dispatch, getState }) => {
    try {
      const availableDNS = await APIService.getAvailableDNS();
      const currentDNS = await APIService.getCurrentDNS();
      return fulfillWithValue({
        availableDNS: sortObjArrByKey(availableDNS?.servers, "name"),
        currentDNS,
      });
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const changeCurrentDNS = createAsyncThunk(
  "CHANGE_CURRENT_DNS",
  async (dns, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await APIService.setDNS({ server: dns.name });
      console.log(response);
      dispatch(CHANGE_SELECTED_DNS(dns));
      return fulfillWithValue();
    } catch (e) {
      console.log(e);

      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to change dns",
        })
      );
      return rejectWithValue();
    }
  }
);

export const subscribeToPlanAction = createAsyncThunk(
  "SUBSCRIBE_TO_A_PLAN",
  async (
    payload,
    { dispatch, rejectWithValue, fulfillWithValue, getState }
  ) => {
    const walletAddress = getState().device.walletAddress;
    try {
      const response = await APIService.subscribeToPlan(6, payload);
      dispatch(SHOW_RENEW_SUBSCRIPTION(false));
      await dispatch(
        withLoader({ dispatchers: [dispatchGetSubscriptions(walletAddress)] })
      );
      return fulfillWithValue(response);
    } catch (e) {
      dispatch(
        SET_SHOW_ERROR_ALERT({
          showErrorAlert: true,
          message: "Failed to subscribe",
        })
      );
      dispatch(dispatchGetBalance(walletAddress));
      return rejectWithValue();
    }
  }
);
