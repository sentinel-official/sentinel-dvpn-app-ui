import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import { useDeviceSelector, useNodesSelector } from "@hooks/use-selector";
import { dispatchFetchCitiesList } from "@actions/proxy.actions";
import CityCard from "@containers/Nodes/CityCard";
import useSearchText from "@hooks/use-search-text";

const CitiesList = () => {
  const { searchText, onSearchTextChange } = useSearchText();
  const dispatch = useDispatch();
  const params = useParams();
  const { current: countries = [] } = useNodesSelector().countries;
  const { current: cities = [] } = useNodesSelector().cities;
  const { protocols } = useDeviceSelector();
  const [list, setList] = React.useState(cities);

  const country = React.useMemo(() => {
    const data = countries.filter((c) => c.id === Number.parseInt(params.countryId));
    if (data && data.length > 0) {
      return data[0];
    }
    return {};
  }, [params.countryId, countries.length]);

  React.useEffect(() => {
    if (country && country.name) {
      dispatch(
        dispatchFetchCitiesList({
          countryId: params.countryId,
          country,
        })
      );
    }
  }, [protocols, params.countryId, country?.name]);

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: country?.name || "select_a_city",
        canGoBack: true,
      })
    );
    onSearchTextChange("");
  }, [dispatch, window.location.pathname, country?.name]);

  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, [list]);
  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const l = cities.filter((c) => {
        if (String(c.name).toLowerCase().includes(searchText.toLowerCase())) {
          return c;
        }
      });
      setList(l);
      return;
    }
    setList(cities);
  }, [searchText, cities]);
  return (
    <div id="top">
      {list.map((c, i) => {
        return <CityCard city={c} key={`city-${i}`} />;
      })}
    </div>
  );
};

export default CitiesList;
