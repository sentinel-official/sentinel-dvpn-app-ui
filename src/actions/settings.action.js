import { createAsyncThunk } from "@reduxjs/toolkit";
import dnsServices from "../services/dns.services";
import { CHANGE_ERROR_ALERT } from "../redux/reducers/alerts.reducer";
import registryServices from "../services/registry.services";

export const dispatchGetAvailableDNS = createAsyncThunk(
  "GET_AVAILABLE_DNS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const availableDNSResponse = await dnsServices.getAvailableDNS();
      const currentDNSResponse = await dnsServices.getCurrentDNS();
      return fulfillWithValue({
        available: availableDNSResponse.servers,
        current: currentDNSResponse,
      });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to fetch DNS",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchPutSelectedDNS = createAsyncThunk(
  "PUT_SELECTED_DNS",
  async (dns, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await dnsServices.putDNS({ server: dns.name });
      return fulfillWithValue(dns);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to change DNS",
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetLogs = createAsyncThunk(
  "PUT_SELECTED_DNS",
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      await registryServices.getLogs();
      return fulfillWithValue();
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to Open Share",
        })
      );
      return rejectWithValue();
    }
  }
);
