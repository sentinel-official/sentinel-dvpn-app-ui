import React from "react";
import { useDeviceSelector } from "@hooks/use-selector";
import RecentServerCard from "@containers/Nodes/RecentServerCard";
import { useDispatch } from "react-redux";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import useSearchText from "@hooks/use-search-text";
import { dispatchUpdateRecentServers } from "@actions/proxy.actions";

const RecentServers = () => {
  const { recentServers = [] } = useDeviceSelector();
  const { searchText, onSearchTextChange } = useSearchText();
  const [list, setList] = React.useState(recentServers);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "recent_servers",
        canGoBack: false,
      })
    );
    if (recentServers && recentServers.length > 0) {
      dispatch(dispatchUpdateRecentServers(recentServers));
    }
    onSearchTextChange("");
  }, []);
  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, [list]);
  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const l = recentServers.filter((c) => {
        if (
          String(c.name).toLowerCase().includes(searchText.toLowerCase()) ||
          String(c.address).toLowerCase().includes(searchText.toLowerCase()) ||
          String(c.cityName).toLowerCase().includes(searchText.toLowerCase()) ||
          String(c.countryName).toLowerCase().includes(searchText.toLowerCase())
        ) {
          return c;
        }
      });
      setList(l);
      return;
    }
    setList(recentServers);
  }, [searchText, recentServers]);
  return (
    <div id="top">
      {list.map((r, i) => {
        return <RecentServerCard server={r} key={`server-${i}`} index={i} />;
      })}
    </div>
  );
};

export default RecentServers;
