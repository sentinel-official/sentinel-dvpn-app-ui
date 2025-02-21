import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  modalData: {},
};

const slice = createSlice({
  name: "ALERTS",
  initialState,
  reducers: {
    ADD_NEW_ALERT: (state, { payload }) => {
      state.alerts.unshift(payload);
    },
    REMOVE_OLDEST_ALERT: (state) => {
      state.alerts.pop();
    },
    ADD_MODAL_DATA: (state, { payload }) => ({ ...state, modalData: payload }),
  },
});

export const { ADD_NEW_ALERT, REMOVE_OLDEST_ALERT, ADD_MODAL_DATA } = slice.actions;

export default slice.reducer;
