import React from "react";
import Button from "../../components/Button";
import { variants } from "../../components/Card";
import FilterIcon from "../../assets/icons/filter-icon.svg";
import styles from "./filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";

const Filter = () => {
  const dispatch = useDispatch();
  const protocols = useSelector((state) => state.device.protocols);

  return (
    <Button
      variant={`${
        protocols !== "V2RAY,WIREGUARD" ? variants.PRIMARY : variants.SECONDARY
      }`}
      className={styles.root}
      icon={FilterIcon}
      onClick={() => {
        dispatch(CHANGE_MODAL_STATE({ show: true, type: "filters" }));
      }}
    />
  );
};

export default Filter;
