import { dispatchPaymentLogin } from "@actions/payments.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const slice = createSlice({
  name: "PAYMENTS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(dispatchPaymentLogin.fulfilled, (state, { payload }) => ({ ...state, products: payload }));
  },
});

export default slice.reducer;
