import CountryCard from "@containers/Nodes/CountryCard";
import useSearchText from "@hooks/use-search-text";
import { useNodesSelector } from "@hooks/use-selector";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CountriesList = () => {
  const { searchText, onSearchTextChange } = useSearchText();
  const dispatch = useDispatch();
  const { current } = useNodesSelector().countries;
  const [list, setList] = useState(current);

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({ title: "select_a_country", canGoBack: false })
    );
    onSearchTextChange("");
  }, [dispatch, window.location.pathname]);
  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, [list]);
  React.useEffect(() => {
    if (searchText && searchText.length > 0) {
      const l = current.filter((c) => {
        if (String(c.name).toLowerCase().includes(searchText.toLowerCase())) {
          return c;
        }
      });
      setList(l);
      return;
    }
    setList(current);
  }, [searchText, current]);
  return (
    <div id="top">
      {list.map((c, i) => {
        return <CountryCard country={c} key={`country-${i}`} />;
      })}
    </div>
  );
};

export default CountriesList;
