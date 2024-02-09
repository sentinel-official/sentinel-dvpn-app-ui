import React from "react";
import types from "./modal-types";
import styles from "./modal.module.scss";

const Modal = ({ type, ...rest }) => {
  const Component = types[type];
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Component {...rest} />
      </div>
    </div>
  );
};

export default Modal;
