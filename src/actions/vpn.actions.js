import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SET_LOADING_MESSAGE,
  SET_SHOW_ERROR_ALERT,
} from "../redux/alerts.reducer";
import APIService from "../services/app.services";
import { dispatchGetBalance } from "./user.actions";

export const disconnectAction = createAsyncThunk(
  "DISCONNECT_TO_VPN",
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const walletAddress = getState().device.walletAddress;

    try {
      const response = await APIService.disconnect();
      if (response.isConnected === false) {
        throw new Error({ msg: "Failed to disconnect" });
      } else {
        return fulfillWithValue();
      }
    } catch (e) {
      if (e && e.msg) {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: e.msg,
          })
        );
      } else {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: "Failed to disconnect",
          })
        );
      }
      dispatch(dispatchGetBalance(walletAddress));
      return rejectWithValue();
    }
  }
);

export const connectAction = createAsyncThunk(
  "CONNECT_ACTION",
  async (
    { node, subscription },
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    const walletAddress = getState().device.walletAddress;
    try {
      const session = await APIService.getSession(walletAddress);

      if (
        !(
          session.nodeAddress === node.address &&
          session.subscriptionId === subscription.base.id
        )
      ) {
        throw new Error({ msg: "Failed to get Session details" });
      }

      const payload = {
        activeSession: Number.parseInt(session.id),
        subscriptionID: Number.parseInt(session.subscriptionId),
        node: session.nodeAddress,
      };
      dispatch(SET_LOADING_MESSAGE("Creating Sessions..."));
      const createdSession = await APIService.createSession(
        walletAddress,
        payload
      );

      if (createdSession) {
        dispatch(SET_LOADING_MESSAGE("Fetching Credentials..."));

        const payload = {
          url: node.remote_url,
          nodeProtocol: node.protocol,
          address: walletAddress,
          session: Number.parseInt(session.id),
        };
        const credentials = await APIService.fetchCredentials(payload);
        console.log("credentials", credentials);
        if (credentials) {
          dispatch(SET_LOADING_MESSAGE("Connecting to VPN..."));

          const connected = await APIService.connect({
            data: credentials,
          });
          if (connected) {
          } else {
            throw new Error({ msg: "Failed to connect" });
          }
        } else {
          throw new Error({ msg: "Failed to fetch credentials" });
        }
      }

      return fulfillWithValue();
    } catch (e) {
      if (e && e.msg) {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: e.msg,
          })
        );
      } else {
        dispatch(
          SET_SHOW_ERROR_ALERT({
            showErrorAlert: true,
            message: "Failed to Connect to VPN",
          })
        );
      }
      dispatch(dispatchGetBalance(walletAddress));
      return rejectWithValue();
    }
  }
);
