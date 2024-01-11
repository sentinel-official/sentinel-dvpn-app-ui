import React from "react";
import styles from "./styles.module.scss";
const Modal = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Modal;
