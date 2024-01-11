import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    SET_ACCOUNT_BALANCE: (state, { payload }) => ({
      ...state,
      balance: payload,
    }),
  },
});

export const { SET_ACCOUNT_BALANCE } = accountSlice.actions;

export default accountSlice.reducer;
