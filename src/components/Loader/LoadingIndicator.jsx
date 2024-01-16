import React from "react";
import styles from "./loading-indicator.module.scss";

const LoadingIndicator = () => {
  return (
    <div className={styles["lds-ripple"]}>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIndicator;
