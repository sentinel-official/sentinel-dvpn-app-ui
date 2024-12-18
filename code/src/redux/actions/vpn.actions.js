import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { CHANGE_MESSAGE } from "@reducers/loader.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import proxyServices from "@services/proxy.services";
import vpnServices from "@services/vpn.services";

export const dispatchFetchIPAddress = createAsyncThunk(
  "VPN/FETCH_IP_ADDRESS",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await proxyServices.fetchIPAddress();
      return fulfillWithValue({
        ipAddress: response.data.ip,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      });
    } catch (e) {
      return rejectWithValue();
    }
  }
);

export const dispatchFetchConnectionStatus = createAsyncThunk(
  "VPN/FETCH_CONNECTION_STATUS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await vpnServices.getConnectedStatus();
      return fulfillWithValue(response.isConnected);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_connection_status`,
          data: { error: e.message },
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchDisconnectFromVPN = createAsyncThunk(
  "VPN/DISCONNECT_FROM_VPN",
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await vpnServices.postDisconnect();
      return fulfillWithValue(response.isConnected);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_disconnecting_vpn`,
          data: { error: e.message },
        })
      );
      return rejectWithValue(e);
    }
  }
);

export const dispatchConnectToVPN = createAsyncThunk(
  "VPN/CONNECT_TO_VPN",
  async (
    { credentials = {}, node = {} },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(
        CHANGE_MESSAGE({
          message: `connecting_to_vpn`,
        })
      );
      const response = await vpnServices.createConnection({
        data: credentials,
      });
      if (response.isConnected) {
        return fulfillWithValue({ isConnected: response.isConnected, node });
      }
      throw "error_connecting_vpn";
    } catch (e) {
      return rejectWithValue({
        isConnected: false,
        message: `error_connecting_vpn`,
      });
    }
  }
);
