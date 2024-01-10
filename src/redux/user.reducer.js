import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deviceToken: null,
  walletAddress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_DETAILS: (state, { payload }) => ({
      ...state,
      walletAddress: payload.address,
      deviceToken: payload.value,
    }),
  },
});

export const { SET_USER_DETAILS } = userSlice.actions;

export default userSlice.reducer;
