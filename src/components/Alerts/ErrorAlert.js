import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_ERROR_ALERT } from "../../redux/reducers/alerts.reducer";
import styles from "./alerts.module.scss";

const ErrorAlert = () => {
  const { show, message } = useSelector((state) => state.alerts.error);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (show && message) {
      setTimeout(() => {
        dispatch(CHANGE_ERROR_ALERT({ show: false, message: null }));
      }, 2000);
    }
  }, [show, dispatch, message]);

  if (show) {
    return (
      <div className={styles.error}>
        <span>{message}</span>
      </div>
    );
  }
  return null;
};

export default ErrorAlert;
