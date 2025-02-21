const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isAuthenticated: false,
  walletAddress: "",
  mnemonic: "",
  isEncrypted: false,
};

const slice = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    CHANGE_ENCRYPTION_STATUS: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    CHANGE_AUTH_STATUS: (state, { payload }) => ({
      ...state,
      isAuthenticated: payload.isAuthenticated,
      walletAddress: payload.walletAddress,
      mnemonic: payload.mnemonic,
      isEncrypted: payload.isEncrypted,
    }),
  },
});

export const { CHANGE_AUTH_STATUS, CHANGE_ENCRYPTION_STATUS } = slice.actions;

export default slice.reducer;
