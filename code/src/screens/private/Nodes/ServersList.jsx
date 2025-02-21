import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import { useDeviceSelector, useNodesSelector } from "@hooks/use-selector";
import { dispatchFetchServersList } from "@actions/proxy.actions";
import ServersCard from "@containers/Nodes/ServersCard";
import useSearchText from "@hooks/use-search-text";

const ServersList = () => {
  const params = useParams();
  const { searchText, onSearchTextChange } = useSearchText();

  const dispatch = useDispatch();
  const { current: cities = [] } = useNodesSelector().cities;
  const { current: servers = [] } = useNodesSelector().servers;

  const { protocols } = useDeviceSelector();
  const [list, setList] = React.useState(servers);

  const city = React.useMemo(() => {
    const data = cities.filter((c) => c.id === Number.parseInt(params.cityId));
    if (data && data.length > 0) {
      return data[0];
    }
    return {};
  }, [params.cityId, cities.length]);

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: city?.name
          ? `${city?.name}, ${city.countryCode}`
          : "select_a_server",
        canGoBack: true,
      })
    );
    onSearchTextChange("");
  }, [dispatch, window.location.pathname, city?.name, city?.countryCode]);

  React.useEffect(() => {
    if (city && city.name) {
      dispatch(dispatchFetchServersList(city));
    }
  }, [protocols, params.cityId, city?.name]);

  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, [list]);

  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const l = servers.filter((c) => {
        if (
          String(c.name).toLowerCase().includes(searchText.toLowerCase()) ||
          String(c.address).toLowerCase().includes(searchText.toLowerCase())
        ) {
          return c;
        }
      });
      setList(l);
      return;
    }
    setList(servers);
  }, [searchText, servers]);

  return (
    <div id="top">
      {list.map((s, i) => {
        return <ServersCard server={s} key={`server-${i}`} />;
      })}
    </div>
  );
};

export default ServersList;
