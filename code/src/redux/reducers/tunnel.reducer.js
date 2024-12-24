import {
  dispatchGetToggleTunnelEnableStatus,
  dispatchGetAllApps,
  dispatchGetTunnelledApps,
} from "@actions/tunnel.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEnabled: true,
  allApps: [],
  tunnelledApps: [],
};
const slice = createSlice({
  name: "TUNNEL",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      dispatchGetToggleTunnelEnableStatus.fulfilled,
      (state, { payload }) => ({
        ...state,
        isEnabled: payload,
      })
    );
    builder
      .addCase(dispatchGetAllApps.pending, (state) => {})
      .addCase(dispatchGetAllApps.fulfilled, (state, { payload }) => {
        state.allApps = payload;
      })
      .addCase(dispatchGetAllApps.rejected, (state) => { });
    
     builder
      .addCase(dispatchGetTunnelledApps.pending, (state) => {})
      .addCase(dispatchGetTunnelledApps.fulfilled, (state, { payload }) => {
        state.tunnelledApps = payload;
      })
      .addCase(dispatchGetTunnelledApps.rejected, (state) => { });
    
    
  },
});

export default slice.reducer;
