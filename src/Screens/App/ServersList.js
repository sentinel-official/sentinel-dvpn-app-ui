import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  withSingleDispatcherLoader,
} from "../../actions/loader.action";
import {
  SET_CAN_GO_BACK,
  SET_PAGE_TITLE,
  SET_SEARCH_TEXT,
} from "../../redux/reducers/nodes.reducer";
import { dispatchGetAvailableNodes } from "../../actions/nodes.action";
import ServerCard from "../../containers/NodesScreens/Cards/ServerCard";

const ServersList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const city = useSelector((state) => state.nodes.selected.city);
  const cities = useSelector((state) => state.nodes.cities.current);
  const servers = useSelector((state) => state.nodes.servers.current);
  const searchText = useSelector((state) => state.nodes.searchText);
  const protocols = useSelector((state) => state.device.protocols);
  const [filtered, setFiltered] = React.useState([]);

  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const result = servers.filter(
        (c) =>
          String(c.name)
            .toLowerCase()
            .includes(String(searchText).toLowerCase()) ||
          String(c.address)
            .toLowerCase()
            .includes(String(searchText).toLowerCase())
      );
      setFiltered(result);
      return;
    }
    setFiltered(servers);
  }, [servers, searchText]);

  React.useEffect(() => {
    dispatch(SET_SEARCH_TEXT(""));

    if (city && city.id) {
      dispatch(
        SET_PAGE_TITLE(
          city.name ? `${city.name}, ${city.code}` : "Select a Node"
        )
      );
      dispatch(SET_CAN_GO_BACK(true));
      return;
    }
    if (cities && cities.length > 0) {
      cities.forEach((c) => {
        if (c.id === Number.parseInt(params.cityId)) {
          dispatch(
            SET_PAGE_TITLE(c.name ? `${c.name}, ${c.code}` : "Select a Node")
          );
          dispatch(SET_CAN_GO_BACK(true));
          return;
        }
      });
      return;
    }
    dispatch(SET_PAGE_TITLE("Select a Node"));
    dispatch(SET_CAN_GO_BACK(true));
  }, [cities, city, dispatch, params.cityId]);

  React.useEffect(() => {
    dispatch(withSingleDispatcherLoader(dispatchGetAvailableNodes(city)));
  }, [protocols, dispatch, city, params.countryId]);

  return (
    <>
      {Array.isArray(filtered) &&
        filtered.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
    </>
  );
};

export default ServersList;
