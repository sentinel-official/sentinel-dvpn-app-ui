import React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  filterCities,
  filterCountries,
  filterNodes,
} from "../../helpers/parseData";
import {
  SET_FILTERED_CITIES,
  SET_FILTERED_COUNTRIES,
  SET_FILTERED_NODES,
  SET_SEARCH_TEXT,
} from "../../redux/nodes.reducer";
import SearchIcon from "../../assets/icons/search-icon.svg";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import Button, { variants } from "../../components/Button";

const ListSearchConnect = () => {
  const dispatch = useDispatch("");
  const params = useParams();
  const { cities, nodes, countries, searchText } = useSelector(
    (state) => state.nodes
  );
  React.useEffect(() => {
    if (params.countryId && params.cityId) {
      const filtered = filterNodes(nodes[params.cityId], searchText);
      dispatch(SET_FILTERED_NODES(filtered));
    } else if (params.countryId) {
      const filtered = filterCities(cities[params.countryId], searchText);
      dispatch(SET_FILTERED_CITIES(filtered));
    } else {
      const filtered = filterCountries(countries, searchText);
      dispatch(SET_FILTERED_COUNTRIES(filtered));
    }
  }, [
    dispatch,
    nodes,
    searchText,
    params.countryId,
    params.cityId,
    cities,
    countries,
  ]);

  React.useLayoutEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));
  }, [params.countryId, params.cityId, dispatch]);

  const onSearchTextChange = (value) => {
    dispatch(SET_SEARCH_TEXT(value));
  };

  return (
    <div className={styles["search-connect"]}>
      <div className={styles.input}>
        <img src={SearchIcon} alt="" />
        <input
          placeholder="Search"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </div>
      <Button
        icon={QuickConnectIcon}
        title={"Connect"}
        variant={variants.primary}
      />
    </div>
  );
};

export default ListSearchConnect;
