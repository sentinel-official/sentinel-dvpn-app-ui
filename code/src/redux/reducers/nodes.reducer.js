import {
  dispatchFetchCitiesList,
  dispatchFetchCountriesList,
  dispatchFetchServersList,
} from "@actions/proxy.actions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: {
    all: [],
    current: [],
  },
  cities: {
    all: [],
    current: [],
  },
  servers: { all: [], current: [] },
  searchText: "",
};

const slice = createSlice({
  name: "NODES",
  initialState,
  reducers: {
    CHANGE_SEARCH_TEXT: (state, { payload }) => ({
      ...state,
      searchText: payload,
    }),
    MAKE_CURRENT_CITIES_EMPTY: (state) => ({
      ...state,
      cities: {
        ...state.cities,
        current: [],
      },
    }),
    MAKE_CURRENT_SERVERS_EMPTY: (state) => ({
      ...state,
      servers: {
        ...state.servers,
        current: [],
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      dispatchFetchCountriesList.fulfilled,
      (state, { payload }) => ({
        ...state,
        countries: {
          ...state.countries,
          all: payload.all || [],
          current: payload.current || [],
        },
      })
    );
    builder.addCase(
      dispatchFetchCitiesList.fulfilled,
      (state, { payload }) => ({
        ...state,
        cities: {
          ...state.cities,
          current: payload.current || [],
          all: payload.all || state.cities.all,
        },
      })
    );
    builder.addCase(
      dispatchFetchServersList.fulfilled,
      (state, { payload }) => ({
        ...state,
        servers: {
          ...state.servers,
          current: payload.current || [],
          all: payload.all || state.servers.all,
        },
      })
    );
  },
});

export const {
  MAKE_CURRENT_CITIES_EMPTY,
  MAKE_CURRENT_SERVERS_EMPTY,
  CHANGE_SEARCH_TEXT,
} = slice.actions;

export default slice.reducer;
