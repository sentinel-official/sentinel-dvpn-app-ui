import { createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../services/app.services";
import {
  SET_LOADING_MESSAGE,
  SET_SHOW_ERROR_ALERT,
  SHOW_NO_BALANCE,
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
      if (balance === 0) {
        dispatch(SHOW_NO_BALANCE(true));
      }
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

export const fetchCredentials = createAsyncThunk(
  "FETCH_CREDENTIALS",
  async () => {}
);

export const createASession = createAsyncThunk(
  "CREATE_A_SESSION",
  async () => {}
);

export const checkActiveSession = createAsyncThunk(
  "CHECK_ACTIVE_SESSION",
  async (
    { subscriptionId, secondTime },
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    try {
      const walletAddress = getState().device.walletAddress;
      const selectedNode = getState().device.selectedNode;
      console.log("selectedNode", selectedNode);
      const session = await APIService.getSession(walletAddress);
      console.log("session", session);

      if (
        session &&
        session.status === "STATUS_ACTIVE" &&
        session.subscriptionId === String(subscriptionId) &&
        session.nodeAddress === selectedNode.address
      ) {
        if (secondTime) {
          dispatch(fetchCredentials());
        } else {
          dispatch(createASession());
        }
      } else {
        dispatch(createASession());
      }
    } catch (e) {
      dispatch(createASession(subscriptionId));
      return rejectWithValue();
    }
  }
);

export const connectAction = createAsyncThunk(
  "CONNECT",
  async (_, { getState, fulfillWithValue, rejectWithValue, dispatch }) => {
    const walletAddress = getState().device.walletAddress;
    APIService.getSubscriptions(walletAddress)
      .then((response) => {
        console.log("CONNECT", response);
        if (response && response.planSubscriptions) {
          const subscription = response.planSubscriptions.find(
            (subscription) => {
              return subscription.planId === "6";
            }
          );
          if (subscription) {
            dispatch(
              SET_LOADING_MESSAGE({
                loadingMessage: "Looking for active sessions...",
              })
            );
            dispatch(
              checkActiveSession({
                subscriptionId: Number(subscription.base.id),
              })
            );
          } else {
            dispatch(
              checkActiveSession({
                subscriptionId: Number(subscription.base.id),
              })
            );
            dispatch(SHOW_RENEW_SUBSCRIPTION(true));
          }
        } else {
          dispatch(SHOW_RENEW_SUBSCRIPTION(true));
        }
      })
      .catch(() => {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: "Failed to Connect",
          })
        );
        return rejectWithValue();
      });
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
          message: "Failed to subscribe",
        })
      );
      return rejectWithValue();
    }
  }
);
