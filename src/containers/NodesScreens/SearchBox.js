import React from "react";
import MagnifierIcon from "../../assets/icons/magnifier-icon.svg";
import styles from "./search-box.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SET_SEARCH_TEXT } from "../../redux/reducers/nodes.reducer";
const SearchBox = () => {
  const searchText = useSelector((state) => state.nodes.searchText);
  const dispatch = useDispatch();

  return (
    <section className={styles.root}>
      <img src={MagnifierIcon} alt="" />
      <input
        type="text"
        value={searchText}
        placeholder="Search"
        onChange={(e) => {
          e.preventDefault();
          dispatch(SET_SEARCH_TEXT(e.target.value));
        }}
      />
    </section>
  );
};

export default SearchBox;
