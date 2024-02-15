import { createAsyncThunk } from "@reduxjs/toolkit";
import proxyServices from "../services/proxy.services";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
} from "../redux/reducers/alerts.reducer";
import {
  parseCitiesList,
  parseCountriesList,
  parseServersList,
} from "../helpers/data.parser";
import {
  getCitiesByCountryId,
  getCountriesByProtocol,
} from "../helpers/getCitiesByCountryId";
import { getServersByCity } from "../helpers/filterServers";

export const dispatchGetAvailableCountries = createAsyncThunk(
  "GET_AVAILABLE_COUNTRIES",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    dispatch(
      CHANGE_LOADER_STATE({ show: true, message: "Fetching Countries..." })
    );
    try {
      const deviceToken = getState().device.deviceToken;
      const protocols = getState().device.protocols;
      const list = getState().nodes.countries;

      const current = getCountriesByProtocol(list, protocols);
      if (current && current.length > 0) {
        return fulfillWithValue(current);
      }
      const response = await proxyServices.getCountriesList(
        deviceToken,
        String(protocols).split(",")
      );
      const countries = parseCountriesList(response, protocols);
      return fulfillWithValue(countries);
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed fetch Countries" })
      );
      return rejectWithValue();
    }
  }
);
export const dispatchGetAvailableCities = createAsyncThunk(
  "GET_AVAILABLE_CITIES",
  async (
    country,
    { fulfillWithValue, rejectWithValue, getState, dispatch }
  ) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: `Fetching Cities of ${country.name}`,
        })
      );
      const deviceToken = getState().device.deviceToken;
      const protocols = getState().device.protocols;
      const list = getState().nodes.cities.all;
      const current = getCitiesByCountryId(country.id, list, protocols);
      if (current && current.length > 0) {
        return fulfillWithValue({ all: list, current });
      }
      const response = await proxyServices.getCitiesList(
        country.id,
        deviceToken,
        String(protocols).split(",")
      );
      const cities = parseCitiesList(response, country, protocols);
      return fulfillWithValue({ all: [...list, ...cities], current: cities });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed fetch Cities" })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchGetAvailableNodes = createAsyncThunk(
  "GET_AVAILABLE_NODES",
  async (city, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(
        CHANGE_LOADER_STATE({
          show: true,
          message: `Fetching Servers of ${city.name}`,
        })
      );

      const deviceToken = getState().device.deviceToken;
      const protocols = String(getState().device.protocols).split(",");
      const list = getState().nodes.servers.all;
      const current = getServersByCity(city, list, protocols);
      if (current && current.length > 0) {
        return fulfillWithValue({ all: list, current });
      }
      const response = await proxyServices.getServersList(
        city.country_id,
        city.id,
        deviceToken,
        protocols
      );
      const nodes = parseServersList(response, city, protocols);
      return fulfillWithValue({ all: [...list, ...nodes], current: nodes });
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({ show: true, message: "Failed fetch Servers" })
      );
      return rejectWithValue();
    }
  }
);
