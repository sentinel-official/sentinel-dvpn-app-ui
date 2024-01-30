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
import {
  SHOW_NO_BALANCE,
  SHOW_RENEW_SUBSCRIPTION,
} from "../../redux/alerts.reducer";
import { connectAction } from "../../actions/vpn.actions";
import { withLoader } from "../../actions/loader.actions";
import { getRandomNode } from "../../helpers/getRandomNode";
import { CHANGE_SELECTED_NODE } from "../../redux/device.reducer";
import {
  filterNodesByCountry,
  filterNodesByCity,
} from "../../helpers/filterNodes";

const ListSearchConnect = () => {
  const dispatch = useDispatch("");
  const params = useParams();
  const { cities, nodes, countries, searchText } = useSelector(
    (state) => state.nodes
  );
  const { balance, subscription } = useSelector((state) => state.account);
  const [nodesList, setNodesList] = React.useState([]);
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

  React.useEffect(() => {
    if (nodes && Object.values(nodes).length > 0) {
      if (params.cityId) {
        const filtered = filterNodesByCity(
          Object.values(nodes).flat(1),
          params.cityId
        );
        setNodesList(filtered);
      } else if (params.countryId) {
        const filtered = filterNodesByCountry(
          Object.values(nodes).flat(1),
          params.countryId
        );
        setNodesList(filtered);
      } else {
        const filtered = Object.values(nodes).flat(1);
        setNodesList(filtered);
      }
    }
  }, [nodes, params.cityId, params.countryId]);

  const connect = () => {
    if (balance === 0) {
      dispatch(SHOW_NO_BALANCE(true));
      return;
    }
    if (subscription && Object.keys(subscription).length > 0) {
      const node = getRandomNode(nodesList);
      if (node) {
        dispatch(
          withLoader({
            dispatchers: [
              CHANGE_SELECTED_NODE(node),
              connectAction({ node, subscription }),
            ],
          })
        );
      }

      return;
    }
    dispatch(SHOW_RENEW_SUBSCRIPTION(true));
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
        disabled={nodesList && nodesList.length === 0}
        icon={QuickConnectIcon}
        title={"Connect"}
        variant={variants.primary}
        onClick={connect}
      />
    </div>
  );
};

export default ListSearchConnect;
