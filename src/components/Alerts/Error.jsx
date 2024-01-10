import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_ERROR_ALERT } from "../../redux/alerts.reducer";
import styles from "./styles.module.scss";

const Error = () => {
  const { showErrorAlert, message } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showErrorAlert && message) {
      setTimeout(() => {
        dispatch(
          SET_SHOW_ERROR_ALERT({ showErrorAlert: false, message: null })
        );
      }, 2000);
    }
  }, [showErrorAlert, dispatch, message]);

  if (showErrorAlert) {
    return (
      <div className={styles.error}>
        <span>{message}</span>
      </div>
    );
  }
  return null;
};

export default Error;
