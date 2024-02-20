import React from "react";
import styles from "./filters.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
import RadioButton from "../../components/RadioButton";
import { SET_PROTOCOL } from "../../redux/reducers/device.reducer";

const types = {
  All: "V2RAY,WIREGUARD",
  V2Ray: "V2RAY",
  Wireguard: "WIREGUARD",
};

const FiltersModal = () => {
  const dispatch = useDispatch();
  const protocols = useSelector((state) => state.device.protocols);
  return (
    <div className={styles.root}>
      <span className={styles.title}>Filter by Protocols</span>
      <section className={styles.list}>
        {Object.entries(types).map(([key, value]) => {
          const isChecked = value === protocols;
          return (
            <RadioButton
              className={styles["filter-item"]}
              value={key}
              key={key}
              isChecked={isChecked}
              onChange={() => {
                dispatch(SET_PROTOCOL(value));
                dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
              }}
            />
          );
        })}
      </section>
      <Button
        title={"OK"}
        variant={variants.PRIMARY}
        className={styles["ok-btn"]}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }));
        }}
      />
    </div>
  );
};

export default FiltersModal;
