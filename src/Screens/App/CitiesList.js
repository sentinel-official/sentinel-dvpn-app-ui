import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CAN_GO_BACK,
  SET_PAGE_TITLE,
  SET_SEARCH_TEXT,
} from "../../redux/reducers/nodes.reducer";
import CityCard from "../../containers/NodesScreens/Cards/CityCard";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { dispatchGetAvailableCities } from "../../actions/nodes.action";
import { useParams } from "react-router-dom";

const CitiesList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.nodes.selected.country);
  const cities = useSelector((state) => state.nodes.cities.current);
  const countries = useSelector((state) => state.nodes.countries);
  const protocols = useSelector((state) => state.device.protocols);
  const searchText = useSelector((state) => state.nodes.searchText);
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const result = cities.filter((c) =>
        String(c.name).toLowerCase().includes(String(searchText).toLowerCase())
      );
      setFiltered(result);
      return;
    }
    setFiltered(cities);
  }, [cities, searchText]);

  React.useEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
    if (country && country.id) {
      dispatch(SET_PAGE_TITLE(country.name ? country.name : "Select a City"));
      dispatch(SET_CAN_GO_BACK(true));
      return;
    }
    countries.forEach((c) => {
      if (c.id === Number.parseInt(params.countryId)) {
        dispatch(SET_PAGE_TITLE(c.name ? c.name : "Select a City"));
        dispatch(SET_CAN_GO_BACK(true));
        return;
      }
    });
  }, [countries, country, dispatch, params.countryId]);

  React.useEffect(() => {
    dispatch(withSingleDispatcherLoader(dispatchGetAvailableCities(country)));
  }, [protocols, dispatch, country, params.countryId]);

  return (
    <>
      {Array.isArray(filtered) &&
        filtered.map((city) => <CityCard key={city.id} city={city} />)}
    </>
  );
};

export default CitiesList;
