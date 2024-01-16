import { createSlice } from "@reduxjs/toolkit";
import { dispatchGetIpAddress } from "../actions/user.actions";

const initialState = {
  latitude: 0,
  longitude: 0,
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
  },
});

export default mapSlice.reducer;
