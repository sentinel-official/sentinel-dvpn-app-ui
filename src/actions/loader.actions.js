import { createAsyncThunk } from "@reduxjs/toolkit";
import { SET_LOADING_MESSAGE } from "../redux/alerts.reducer";

export const withLoader = createAsyncThunk(
  "WITH_LOADER",
  async (
    { dispatchers = [], message = "Loading..." },
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(SET_LOADING_MESSAGE(message));

      for (const dispatcher of dispatchers) {
        await dispatch(dispatcher);
      }

      return fulfillWithValue();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
