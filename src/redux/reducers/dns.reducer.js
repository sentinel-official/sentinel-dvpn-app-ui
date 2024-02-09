import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchGetAvailableDNS,
  dispatchPutSelectedDNS,
} from "../../actions/settings.action";

const initialState = {
  available: [],
  current: {},
};

const dnsSlice = createSlice({
  name: "DNS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchPutSelectedDNS.fulfilled, (state, { payload }) => ({
      ...state,
      current: payload,
    }));
    builder.addCase(
      dispatchGetAvailableDNS.fulfilled,
      (state, { payload }) => ({
        ...state,
        current: payload.current,
        available: payload.available,
      })
    );
  },
});

export default dnsSlice.reducer;
