import React from "react";
import QuickConnect from "./QuickConnect";
import SearchIcon from "../assets/icons/search-icon.svg";

const ListSearchConnect = ({
  searchText,
  onSearchTextChange,
}: {
  onSearchTextChange?: any;
  searchText?: string;
}) => {
  return (
    <div className="search-connect gap-8">
      <div className="input gap-4">
        <img src={SearchIcon} alt="" />
        <input
          placeholder="Search"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
        />
      </div>
      <QuickConnect title={"Connect"} />
    </div>
  );
};

export default React.memo(ListSearchConnect);
