import filterListByKey, {
  filterCitiesByCountryId,
  filterCountriesByProtocol,
  filterServersByCity,
} from "@helpers/filterListByKey";
import {
  parseCitiesList,
  parseCountriesList,
  parseRecentServers,
  parseServersList,
} from "@helpers/parse.data";
import { ALERT_TYPES } from "@hooks/use-alerts";
import { ADD_NEW_ALERT } from "@reducers/alerts.reducer";
import { START_LOADER, STOP_LOADER } from "@reducers/loader.reducer";
import { createAsyncThunk, current } from "@reduxjs/toolkit";
import proxyServices from "@services/proxy.services";

export const dispatchFetchCountriesList = createAsyncThunk(
  "NODES/FETCH_COUNTRIES_LIST",
  async (_, { fulfillWithValue, rejectWithValue, dispatch, getState }) => {
    try {
      const { all } = getState().nodes.countries;
      const protocols = getState().device.protocols;

      const filtered = filterCountriesByProtocol(all, protocols);

      if (filtered && filtered.length > 0) {
        return fulfillWithValue({ all, current: filtered });
      }
      const response = await proxyServices.fetchCountriesList(
        protocols.split(",")
      );
      const countries = parseCountriesList(response, protocols);
      return fulfillWithValue({
        all: [...all, ...countries],
        current: countries,
      });
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_countries_list`,
          data: { error: e.message },
        })
      );
      return rejectWithValue();
    }
  }
);

export const dispatchFetchCitiesList = createAsyncThunk(
  "NODES/FETCH_CITIES_LIST",
  async (
    { countryId, country },
    { fulfillWithValue, rejectWithValue, getState, dispatch }
  ) => {
    try {
      dispatch(
        START_LOADER({
          message: `fetching_cities_of`,
          data: { name: country.name },
        })
      );
      const protocols = getState().device.protocols;

      const { all = [] } = getState().nodes.cities;
      const filtered = filterCitiesByCountryId(countryId, all, protocols);

      if (filtered && filtered.length > 0) {
        return fulfillWithValue({ all, current: filtered });
      }

      const response = await proxyServices.fetchCitiesList(
        countryId,
        protocols.split(",")
      );
      const parsed = parseCitiesList(response, country, protocols);

      return fulfillWithValue({
        all: [...all, ...parsed],
        current: parsed,
        countryId,
      });
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_cities_of`,
          data: { city: country.name },
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(STOP_LOADER());
    }
  }
);

export const dispatchFetchServersList = createAsyncThunk(
  "NODES/FETCH_SERVERS_LIST",
  async (city, { dispatch, fulfillWithValue, rejectWithValue, getState }) => {
    try {
      dispatch(
        START_LOADER({
          message: `fetching_servers_of`,
          data: { name: city.name },
        })
      );
      const protocols = getState().device.protocols;
      const { all = [] } = getState().nodes.servers;
      const filtered = filterServersByCity(city.id, all, protocols);

      if (filtered && filtered.length) {
        return fulfillWithValue({ all, current: filtered });
      }

      const response = await proxyServices.fetchServersList(
        city.countryId,
        city.id,
        protocols.split(",")
      );

      const data = parseServersList(response, city, protocols);
      const filteredData = filterServersByCity(city.id, data, protocols);

      return fulfillWithValue({
        all: [...all, ...data],
        current: filteredData,
      });
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_servers_of`,
          data: { name: city.name },
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(STOP_LOADER());
    }
  }
);

export const dispatchUpdateRecentServers = createAsyncThunk(
  "DEVICE/UPDATE_RECENT_SERVERS",
  async (
    recentServers = [],
    { dispatch, fulfillWithValue, rejectWithValue, getState }
  ) => {
    try {
      dispatch(
        START_LOADER({
          message: `updating_recent_servers`,
        })
      );

      const addresses = recentServers.map((obj) => obj.address);
      const response = await proxyServices.fetchServersStatus({ addresses });
      const data = parseRecentServers(recentServers, response.data, addresses);
      return fulfillWithValue(data);
    } catch (e) {
      dispatch(
        ADD_NEW_ALERT({
          type: ALERT_TYPES.error,
          message: `error_fetching_servers_of`,
          data: { name: city.name },
        })
      );
      return rejectWithValue();
    } finally {
      dispatch(STOP_LOADER());
    }
  }
);
