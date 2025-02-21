import getRandomFromList from "@helpers/getRandomFromList";
import { useDeviceSelector, useNodesSelector } from "./use-selector";
import {
  filterCitiesByCountryId,
  filterServersByCity,
} from "@helpers/filterListByKey";
import { useDispatch } from "react-redux";
import {
  dispatchFetchCitiesList,
  dispatchFetchCountriesList,
  dispatchFetchServersList,
} from "@actions/proxy.actions";
import { useCallback } from "react";

const useGetRandomNode = () => {
  const dispatch = useDispatch();
  const { protocols } = useDeviceSelector();
  const { all: servers } = useNodesSelector().servers;
  const countries = useNodesSelector().countries;
  const cities = useNodesSelector().cities;

  const getRandomCountry = useCallback(async () => {
    try {
      if (countries.current && countries.current.length > 0) {
        return getRandomFromList(countries.current);
      }
      const payload = await dispatch(dispatchFetchCountriesList()).unwrap();
      if (payload && payload.current && payload.current.length > 0) {
        return getRandomFromList(payload.current);
      }
      throw { message: "error_fetching_countries_list" };
    } catch (e) {
      throw { message: "error_fetching_countries_list" };
    }
  }, [protocols, countries.current]);

  const getRandomCity = useCallback(
    async (country) => {
      try {
        let list;
        if (cities.all && cities.all.length > 0) {
          list = filterCitiesByCountryId(country.id, cities.all, protocols);
        }
        if (list && list.length > 0) {
          return getRandomFromList(list);
        }
        const payload = await dispatch(
          dispatchFetchCitiesList({ countryId: country.id, country })
        ).unwrap();
        if (payload && payload.current && payload.current.length > 0) {
          return getRandomFromList(payload.current);
        }
        throw {
          message: `error_fetching_cities_of`,
          data: { city: country.name },
        };
      } catch (e) {
        throw {
          message: `error_fetching_cities_of`,
          data: { city: country.name },
        };
      }
    },
    [protocols, cities.all]
  );

  const getRandomServer = useCallback(
    async (city, cityId) => {
      try {
        let list;
        const cid = cityId || city.id;
        if (servers && servers.length > 0) {
          list = filterServersByCity(cid, servers, protocols);
        }
        if (list && list.length > 0) {
          return getRandomFromList(list);
        }
        const payload = await dispatch(dispatchFetchServersList(city)).unwrap();
        if (payload && payload.current && payload.current.length > 0) {
          return getRandomFromList(payload.current);
        }
        throw {
          message: `error_fetching_servers_of`,
          data: { name: city.name },
        };
      } catch (e) {
        throw {
          message: `error_fetching_servers_of`,
          data: { name: city.name },
        };
      }
    },
    [servers, protocols]
  );

  return { getRandomCountry, getRandomCity, getRandomServer };
};

export default useGetRandomNode;
