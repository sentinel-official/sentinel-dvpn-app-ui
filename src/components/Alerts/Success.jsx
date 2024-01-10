import React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SET_SHOW_SUCCESS_ALERT } from "../../redux/alerts.reducer";

const Success = () => {
  const { showSuccessAlert, message } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (showSuccessAlert && message) {
      setTimeout(() => {
        dispatch(
          SET_SHOW_SUCCESS_ALERT({ showSuccessAlert: false, message: null })
        );
      }, 2000);
    }
  }, [showSuccessAlert, dispatch, message]);

  if (showSuccessAlert) {
    return (
      <div className={styles.success}>
        <span>{message}</span>
      </div>
    );
  }
  return null;
};

export default Success;
