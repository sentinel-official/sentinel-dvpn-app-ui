import { createAsyncThunk } from "@reduxjs/toolkit";
import APIService from "../services/app.services";
import { segregateByKey } from "../helpers/parseData";
import { SET_LOADING_MESSAGE } from "../redux/alerts.reducer";

export const fetchNodesAction = createAsyncThunk(
  "FETCH_NODES_LIST",
  async (
    { countryId, cityId, city, country, countryCode },
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    try {
      const avaibaleNodes = getState().nodes.nodes;
      if (avaibaleNodes[cityId]) {
        return;
      }
      const deviceToken = getState().device.deviceToken;
      const params = { countryId, cityId, deviceToken };
      const response = await APIService.getNodes(params);
      const nodes = segregateByKey(
        response,
        "city_id",
        city,
        country,
        countryCode
      );
      return fulfillWithValue({ nodes, cityId });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchCitiesAction = createAsyncThunk(
  "FETCH_CITIES_LIST",
  async ({ countryId }, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const avaibaleCities = getState().nodes.cities;
      if (avaibaleCities[countryId]) {
        return;
      }
      const deviceToken = getState().device.deviceToken;
      const response = await APIService.getCities(countryId, deviceToken);
      const cities = segregateByKey(response, "country_id");
      return fulfillWithValue({ cities, countryId });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchCountriesAction = createAsyncThunk(
  "FETCH_COUNTRIES_LIST",
  async (_, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(SET_LOADING_MESSAGE("Fetching Countries"));

      const deviceToken = getState().device.deviceToken;
      const countries = await APIService.getCountries(deviceToken);
      return fulfillWithValue({ countries: countries });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
