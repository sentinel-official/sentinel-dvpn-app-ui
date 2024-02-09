import { createSlice } from "@reduxjs/toolkit";
import {
  dispatchGetAvailableCities,
  dispatchGetAvailableCountries,
  dispatchGetAvailableNodes,
} from "../../actions/nodes.action";

const initialState = {
  pageTitle: "",
  canGoBack: false,
  countries: [],
  cities: {
    all: [],
    current: [],
  },
  servers: {
    all: [],
    current: [],
  },
  searchText: "",
  selected: {
    city: {},
    country: {},
    server: {},
  },
};
const nodesSlice = createSlice({
  name: "NODES",
  initialState,
  reducers: {
    SET_PAGE_TITLE: (state, { payload }) => ({
      ...state,
      pageTitle: payload,
    }),
    SET_CAN_GO_BACK: (state, { payload }) => ({
      ...state,
      canGoBack: payload,
    }),
    SET_SEARCH_TEXT: (state, { payload }) => ({
      ...state,
      searchText: payload,
    }),
    SET_SELECTED: (state, { payload }) => ({
      ...state,
      selected: {
        ...state.selected,
        ...payload,
      },
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(
      dispatchGetAvailableCountries.fulfilled,
      (state, { payload }) => ({
        ...state,
        countries: payload,
      })
    );

    builder
      .addCase(dispatchGetAvailableCities.pending, (state) => {
        return {
          ...state,
          cities: {
            ...state.cities,
            current: [],
          },
        };
      })
      .addCase(dispatchGetAvailableCities.fulfilled, (state, { payload }) => {
        return {
          ...state,
          cities: {
            ...state.cities,
            all: payload.all,
            current: payload.current,
          },
        };
      });

    builder
      .addCase(dispatchGetAvailableNodes.pending, (state) => ({
        ...state,
        servers: {
          ...state.servers,
          current: [],
        },
      }))
      .addCase(dispatchGetAvailableNodes.fulfilled, (state, { payload }) => ({
        ...state,
        servers: {
          ...state.servers,
          all: payload.all,
          current: payload.current,
        },
      }));
  },
});

export const {
  SET_PAGE_TITLE,
  SET_CAN_GO_BACK,
  SET_SELECTED,
  SET_SEARCH_TEXT,
} = nodesSlice.actions;

export default nodesSlice.reducer;
