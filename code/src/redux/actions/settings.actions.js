import { parseDNSListResponse } from "@helpers/parse.data";
import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { START_LOADER, STOP_LOADER } from "@reducers/loader.reducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import settingsServices from "@services/settings.services";

export const dispatchFetchAvailableDNS = createAsyncThunk(
  "SETTINGS/FETCH_AVAILABLE_DNS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await settingsServices.fetchAvailableDNS();
      const payload = parseDNSListResponse(response.servers);
      return fulfillWithValue(payload);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_available_dns`,
          data: { error: e.message },
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchChangeDNS = createAsyncThunk(
  "SETTINGS/CHANGE_DNS",
  async (dns, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(
        START_LOADER({
          message: `changing_dns_loader`,
        })
      );
      await settingsServices.changeDNS(dns);
      return fulfillWithValue(dns);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_switching_dns`,
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(STOP_LOADER());
    }
  }
);

