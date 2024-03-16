import React from "react";
import types from "./modal-types";
import styles from "./modal.module.scss";
import { useDispatch } from "react-redux";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";

const Modal = ({ type, ...rest }) => {
  const Component = types[type];
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <div
        className={styles["modal-backdrop"]}
        onClick={() =>
          dispatch(CHANGE_MODAL_STATE({ show: false, type: null }))
        }
      ></div>

      <div className={styles.container}>
        <Component {...rest} />
      </div>
    </div>
  );
};

export default Modal;
