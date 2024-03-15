import { createAsyncThunk } from "@reduxjs/toolkit";
import vpnServices from "../services/vpn.services";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import { withLoader } from "./loader.action";
import {
  dispatchGetAccountBalance,
  dispatchGetIPAddress,
} from "./home.actions";
import {
  connectToVPN,
  createCredentials,
  createSession,
  getSession,
} from "./vpn.support";

export const dispatchGetVPNStatus = createAsyncThunk(
  "GET_VPN_STATUS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: "Fetching VPN connection status...",
        })
      );
      const response = await vpnServices.getStatus();
      return fulfillWithValue(response.isConnected);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to fetch VPN Status",
        })
      );
      return rejectWithValue();
    }
  }
);

export const disconnectAction = createAsyncThunk(
  "DISCONNECT_TO_VPN",
  async (_, { dispatch, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await vpnServices.postDisconnect();
      if (response.isConnected) {
        throw new Error("Failed to Disconnect");
      } else {
        return fulfillWithValue(response.isConnected);
      }
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to disconnect to VPN",
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(
        withLoader([
          dispatchGetVPNStatus(),
          dispatchGetIPAddress(),
          dispatchGetAccountBalance(),
        ])
      );
    }
  }
);

export const connectAction = createAsyncThunk(
  "CONNECT_ACTION",
  async (node, { fulfillWithValue, rejectWithValue, dispatch, getState }) => {
    try {
      const walletAddress = getState().device.walletAddress;
      const subscription = getState().home.subscription;
      dispatch(
        CHANGE_LOADER_STATE({ show: true, message: "Creating a Session..." })
      );
      const isCreated = await createSession({
        node,
        subscription,
        walletAddress,
      });

      if (isCreated && isCreated === 500) {
        throw new Error({ msg: "Failed to Create Session" });
      }

      if (isCreated) {
        const session = await getSession(walletAddress);
        if (session) {
          dispatch(
            CHANGE_LOADER_STATE({
              show: true,
              message: "Fetching Credentials...",
            })
          );
          const credentials = await createCredentials({
            session,
            node,
            walletAddress,
          });
          if (credentials) {
            dispatch(
              CHANGE_LOADER_STATE({
                show: true,
                message: "Connecting to VPN...",
              })
            );
            const isConnected = await connectToVPN(credentials);
            if (isConnected) {
              return fulfillWithValue({ isConnected, node });
            } else {
              throw new Error({ msg: "Failed to connect to VPN" });
            }
          } else {
            throw new Error({ msg: "Failed to fetch credentials" });
          }
        } else {
          throw new Error({ msg: "Failed to Create Session" });
        }
      } else {
        throw new Error({ msg: "Failed to Create Session" });
      }
    } catch (e) {
      if (e && e.msg) {
        dispatch(CHANGE_ERROR_ALERT({ show: true, message: e.msg }));
      } else {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "Failed to connect to VPN",
          })
        );
      }
      return rejectWithValue();
    } finally {
      dispatch(
        withLoader([
          dispatchGetVPNStatus(),
          dispatchGetIPAddress(),
          dispatchGetAccountBalance(),
        ])
      );
    }
  }
);
