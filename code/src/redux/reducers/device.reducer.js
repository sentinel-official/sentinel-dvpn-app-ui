import { dispatchUpdateRecentServers } from "@actions/proxy.actions";
import { dispatchConnectToVPN } from "@actions/vpn.actions";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  recentServers: [],
  protocols: "V2RAY,WIREGUARD",
};

const getOtherServers = (a, s) => a.filter((e) => e.address !== s.address);

const slice = createSlice({
  name: "DEVICE",
  initialState,
  reducers: {
    CHANGE_PROTOCOL_TYPE: (state, { payload }) => ({
      ...state,
      protocols: payload,
    }),
    ADD_RECENT_SERVER: (state, { payload }) => {
      const otherServers = getOtherServers(state.recentServers, payload);
      const recentServers = [payload].concat(otherServers);
      return { ...state, recentServers };
    },
    REMOVE_RECENT_SERVER: (state, { payload }) => {
      const recentServers = getOtherServers(state.recentServers, payload);
      return { ...state, recentServers };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dispatchConnectToVPN.fulfilled, (state, { payload }) => {
      const otherServers = getOtherServers(state.recentServers, payload.node);
      const recentServers = [payload.node].concat(otherServers);
      return { ...state, recentServers };
    });
    builder.addCase(
      dispatchUpdateRecentServers.fulfilled,
      (state, { payload }) => ({
        ...state,
        recentServers: payload || state.recentServers,
      })
    );
  },
});

export const { REMOVE_RECENT_SERVER, CHANGE_PROTOCOL_TYPE } = slice.actions;

export default slice.reducer;
