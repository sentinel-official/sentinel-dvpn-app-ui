import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SET_LOADING_MESSAGE,
  SET_SHOW_ERROR_ALERT,
} from "../redux/alerts.reducer";
import APIService from "../services/app.services";
import { dispatchGetBalance } from "./user.actions";
import { withLoader } from "./loader.actions";

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
      dispatch(
        withLoader({ dispatchers: [dispatchGetBalance(walletAddress)] })
      );
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
      const sessionGot = await APIService.getSession(walletAddress);
      let session;

      if (
        sessionGot &&
        sessionGot.nodeAddress === node.address &&
        sessionGot.subscriptionId === subscription.base.id
      ) {
        session = sessionGot;
      } else {
        const payload = {
          activeSession: Number.parseInt(session?.id) || null,
          subscriptionID: Number.parseInt(subscription.base.id),
          node: subscription.base.address,
        };
        dispatch(SET_LOADING_MESSAGE("Creating Sessions..."));
        const createdSession = await APIService.createSession(
          walletAddress,
          payload
        );
        session = createdSession;
      }

      if (session) {
        dispatch(SET_LOADING_MESSAGE("Fetching Credentials..."));

        const payload = {
          url: node.remote_url,
          nodeProtocol: node.protocol,
          address: walletAddress,
          session: Number.parseInt(session.id),
        };
        const credentials = await APIService.fetchCredentials(payload);
        if (credentials) {
          dispatch(SET_LOADING_MESSAGE("Connecting to VPN..."));

          const connected = await APIService.connect({ data: credentials });
          if (connected) {
            return fulfillWithValue();
          } else {
            throw new Error({ msg: "Failed to connect" });
          }
        } else {
          throw new Error({ msg: "Failed to fetch credentials" });
        }
      } else {
        throw new Error({ msg: "Failed to creating credentials" });
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
            message: "Failed to Connect to VPN" + e,
          })
        );
      }
      dispatch(
        withLoader({ dispatchers: [dispatchGetBalance(walletAddress)] })
      );
      return rejectWithValue();
    }
  }
);
