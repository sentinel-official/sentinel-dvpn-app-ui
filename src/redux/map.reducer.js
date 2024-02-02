import { createSlice } from "@reduxjs/toolkit";
import { dispatchGetIpAddress } from "../actions/user.actions";
import { connectAction } from "../actions/vpn.actions";

const initialState = {
  latitude: 0.0,
  longitude: 0.0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchGetIpAddress.fulfilled, (state, { payload }) => ({
      ...state,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }));
    builder.addCase(connectAction.fulfilled, (state, { payload }) => ({
      ...state,
      latitude: payload.selectedNode.latitude,
      longitude: payload.selectedNode.longitude,
    }));
  },
});

export default mapSlice.reducer;
