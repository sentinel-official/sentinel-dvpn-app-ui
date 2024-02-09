import { createAsyncThunk } from "@reduxjs/toolkit";

export const withLoader = createAsyncThunk(
  "WITH_LOADER",
  async (dispatchers = [], { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      for (const dispatcher of dispatchers) {
        await dispatch(dispatcher);
      }
      return fulfillWithValue(true);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const withSingleDispatcherLoader = createAsyncThunk(
  "WITH_SINGLE_DISPATCHER_LOADER",
  async (dispatcher, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const result = await dispatch(dispatcher);
      return fulfillWithValue(result);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
