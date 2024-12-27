import { START_LOADER, STOP_LOADER } from "@reducers/loader.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tunnelServcies from "@services/tunnel.services";

export const dispatchGetToggleTunnelEnableStatus = createAsyncThunk(
  "GET_TOGGLE_TUNNEL_ENABLE",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await tunnelServcies.getToggleTunnelEnableStatus();
      return fulfillWithValue(response.status);
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const dispatchSetToggleTunnelEnableStatus = createAsyncThunk(
  "SET_TOGGLE_TUNNEL_ENABLE",
  async (_, { dispatch, fulfillWithValue, getState, rejectWithValue }) => {
    try {
      const { isEnabled } = getState().tunnel;
      await tunnelServcies.setToggleTunnelEnableStatus(!isEnabled);
      await dispatch(dispatchGetToggleTunnelEnableStatus());
      return fulfillWithValue();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dispatchGetTunnelledApps = createAsyncThunk(
  "GET_TUNNEL_APPS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await tunnelServcies.getTunnelledApps();
      return fulfillWithValue(response.apps);
    } catch (error) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_apps`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const dispatchSetTunnelledApps = createAsyncThunk(
  "SET_TUNNEL_APPS",
  async (app, { getState, fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const tunnelledApps = getState().tunnel.tunnelledApps || [];
      const packageName = app.packageName;
      let apps = [...tunnelledApps, packageName].filter((i) => i && i.length > 0);

      if (tunnelledApps && tunnelledApps.includes(packageName)) {
        apps = tunnelledApps.filter((i) => i !== packageName);
      }

      await tunnelServcies.setTunnelledApps(apps);
      await dispatch(dispatchGetTunnelledApps());
      return fulfillWithValue();
    } catch (error) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_updating_apps`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const dispatchGetAllApps = createAsyncThunk(
  "FETCH_ALL_APPS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const respone = await tunnelServcies.getAllApps();
      return fulfillWithValue(
        respone.apps.sort((a, b) => a.appName.localeCompare(b.appName))
      );
    } catch (error) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_apps`,
        })
      );
      return rejectWithValue(error);
    }
  }
);
