import React from "react";
import CountryCard from "../../containers/NodesScreens/Cards/CountryCard";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CAN_GO_BACK,
  SET_PAGE_TITLE,
  SET_SEARCH_TEXT,
} from "../../redux/reducers/nodes.reducer";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { dispatchGetAvailableCountries } from "../../actions/nodes.action";

const CountriesList = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.nodes.countries);
  const searchText = useSelector((state) => state.nodes.searchText);
  const protocols = useSelector((state) => state.device.protocols);
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(() => {
    dispatch(withSingleDispatcherLoader(dispatchGetAvailableCountries()));
  }, [protocols, dispatch]);

  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const result = countries.filter((c) =>
        String(c.name).toLowerCase().includes(String(searchText).toLowerCase())
      );
      setFiltered(result);
      return;
    }
    setFiltered(countries);
  }, [countries, searchText]);

  React.useLayoutEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
    dispatch(SET_PAGE_TITLE("Select a Country"));
    dispatch(SET_CAN_GO_BACK(false));
  }, [dispatch]);

  return (
    <>
      {Array.isArray(filtered) &&
        filtered.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
    </>
  );
};

export default CountriesList;
