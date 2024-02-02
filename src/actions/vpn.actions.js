import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SET_LOADING_MESSAGE,
  SET_SHOW_ERROR_ALERT,
} from "../redux/alerts.reducer";
import APIService from "../services/app.services";
import { dispatchGetBalance, dispatchGetIpAddress } from "./user.actions";
import { withLoader } from "./loader.actions";
import { SET_IS_VPN_CONNECTED } from "../redux/device.reducer";

export const disconnectAction = createAsyncThunk(
  "DISCONNECT_TO_VPN",
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const walletAddress = getState().device.walletAddress;
    const deviceToken = getState().device.deviceToken;

    try {
      const response = await APIService.disconnect();
      if (response.isConnected === false) {
        await dispatch(
          withLoader({
            dispatchers: [
              dispatchGetIpAddress(deviceToken),
              dispatchGetBalance(walletAddress),
            ],
          })
        );
        return fulfillWithValue();
      } else {
        throw new Error({ msg: "Failed to disconnect" });
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
      await dispatch(
        withLoader({ dispatchers: [dispatchGetBalance(walletAddress)] })
      );
      return rejectWithValue();
    }
  }
);

const getSessionId = (sessionGot) => {
  if (sessionGot) {
    return Number.parseInt(sessionGot.id);
  }
  return null;
};

export const connectAction = createAsyncThunk(
  "CONNECT_ACTION",
  async (
    { node, subscription },
    { fulfillWithValue, rejectWithValue, dispatch, getState }
  ) => {
    const walletAddress = getState().device.walletAddress;
    const deviceToken = getState().device.deviceToken;

    try {
      const sessionGot = await APIService.getSession(walletAddress);
      const payload = {
        activeSession: getSessionId(sessionGot, node, subscription),
        subscriptionID: Number.parseInt(subscription.base.id),
        node: node.address,
      };
      dispatch(SET_LOADING_MESSAGE("Creating a Session..."));

      await APIService.createSession(walletAddress, payload);
      const session = await APIService.getSession(walletAddress);
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

          if (connected.isConnected) {
            await dispatch(
              withLoader({
                dispatchers: [
                  dispatchGetIpAddress(deviceToken),
                  dispatchGetBalance(walletAddress),
                ],
              })
            );
            dispatch(SET_IS_VPN_CONNECTED(connected.isConnected));
            return fulfillWithValue({ selectedNode: node });
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
            message: "Failed to Connect to VPN",
          })
        );
      }
      await dispatch(
        withLoader({ dispatchers: [dispatchGetBalance(walletAddress)] })
      );
      return rejectWithValue();
    }
  }
);
