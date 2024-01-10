import React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_SNAK_ALERT } from "../../redux/alerts.reducer";

const Snakbar = () => {
  const { showSnakAlert, message } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showSnakAlert && message) {
      setTimeout(() => {
        dispatch(SET_SHOW_SNAK_ALERT({ showSnakAlert: false, message: null }));
      }, 2000);
    }
  }, [showSnakAlert, dispatch, message]);

  if (showSnakAlert) {
    return (
      <div className={styles.snakbar}>
        <span>{message}</span>
      </div>
    );
  }
  return null;
};

export default Snakbar;
