import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: 0,
  longitude: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    SET_MAP_LOCATION: (state, { payload }) => ({
      ...state,
      latitude: payload.latitude,
      longitude: payload.longitude,
    }),
  },
});

export const { SET_MAP_LOCATION } = mapSlice.actions;

export default mapSlice.reducer;
