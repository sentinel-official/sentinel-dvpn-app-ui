import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCitiesAction,
  fetchCountriesAction,
  fetchNodesAction,
} from "../actions/nodes.actions";

const initialState = {
  searchText: "",
  isCountriesLoading: true,
  countries: [],
  filteredCountries: [],
  isCitiesLoading: true,
  cities: {},
  filteredCities: {},
  isNodesLoading: true,
  nodes: {},
  filteredNodes: {},
  selected: {
    country: {},
    city: {},
  },
};
const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    SET_SELECTED_COUNTRY: (state, { payload }) => ({
      ...state,
      selected: { ...state.selected, country: payload },
    }),
    SET_SELECTED_CITY: (state, { payload }) => ({
      ...state,
      selected: { ...state.selected, city: payload },
    }),
    SET_SEARCH_TEXT: (state, { payload }) => ({
      ...state,
      searchText: payload,
    }),
    SET_FILTERED_COUNTRIES: (state, { payload }) => ({
      ...state,
      filteredCountries: payload,
    }),
    SET_FILTERED_CITIES: (state, { payload }) => ({
      ...state,
      filteredCities: payload,
    }),
    SET_FILTERED_NODES: (state, { payload }) => ({
      ...state,
      filteredNodes: payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesAction.pending, (state) => ({
        ...state,
        isCountriesLoading: true,
      }))
      .addCase(fetchCountriesAction.rejected, (state) => ({
        ...state,
        isCountriesLoading: false,
      }))
      .addCase(fetchCountriesAction.fulfilled, (state, { payload }) => ({
        ...state,
        countries: payload.countries,
        filteredCountries: payload.countries,
        isCountriesLoading: false,
      }));

    builder
      .addCase(fetchCitiesAction.pending, (state) => ({
        ...state,
        isCitiesLoading: true,
      }))
      .addCase(fetchCitiesAction.rejected, (state) => ({
        ...state,
        isCitiesLoading: false,
      }))
      .addCase(fetchCitiesAction.fulfilled, (state, { payload }) => {
        if (payload && payload.cities && payload.countryId) {
          const cities = { ...state.cities, ...payload.cities };
          return {
            ...state,
            cities: cities,
            filteredCities: cities[payload.countryId],
            isCitiesLoading: false,
          };
        }
        return { ...state, isCitiesLoading: false };
      });

    builder
      .addCase(fetchNodesAction.pending, (state) => ({
        ...state,
        isNodesLoading: true,
      }))
      .addCase(fetchNodesAction.rejected, (state) => ({
        ...state,
        isNodesLoading: false,
      }))
      .addCase(fetchNodesAction.fulfilled, (state, { payload }) => {
        if (payload && payload.nodes && payload.cityId) {
          const nodes = { ...state.nodes, ...payload.nodes };
          return {
            ...state,
            nodes: nodes,
            filteredNodes: nodes[payload.cityId],
            isNodesLoading: false,
          };
        }
        return { ...state, isNodesLoading: false };
      });
  },
});

export const {
  SET_SELECTED_CITY,
  SET_SELECTED_COUNTRY,
  SET_FILTERED_COUNTRIES,
  SET_FILTERED_CITIES,
  SET_FILTERED_NODES,
  SET_SEARCH_TEXT,
} = nodesSlice.actions;

export default nodesSlice.reducer;
