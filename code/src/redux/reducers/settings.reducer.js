import { dispatchFetchAvailableDNS } from "@actions/settings.actions";
import { CHANGE_AUTH_STATUS } from "./auth.reducer";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  customDNSList: [],
  dnsList: [],
  feeGrantEnabled: true,
  killSwitch: true
};

const slice = createSlice({
  name: "SETTINGS",
  initialState,
  reducers: {
    ADD_CUSTOM_DNS: (state, { payload }) => ({
      ...state,
      customDNSList: [...state.customDNSList, payload],
    }),
    REMOVE_CUSTOM_DNS: (state, { payload }) => {
      const customDNSList = state.customDNSList.filter(
        (i) =>
          i.preferredName !== payload.preferredName &&
          i.addresses !== payload.addresses
      );
      return {
        ...state,
        customDNSList,
      };
    },
    CHANGE_FEE_GRANT: (state, { payload }) => ({
      ...state,
      feeGrantEnabled: payload,
    }),
    TOGGLE_KILL_SWITCH: (state, {payload})=>({...state, killSwitch: payload})
  },
  extraReducers: (builder) => {
    builder.addCase(
      dispatchFetchAvailableDNS.fulfilled,
      (state, { payload }) => ({ ...state, dnsList: payload })
    );
    builder.addCase(CHANGE_AUTH_STATUS, (state) => ({
      ...state,
      ...initialState,
    }));
  },
});

export const { ADD_CUSTOM_DNS, REMOVE_CUSTOM_DNS, CHANGE_FEE_GRANT, TOGGLE_KILL_SWITCH } = slice.actions;

export default slice.reducer;
