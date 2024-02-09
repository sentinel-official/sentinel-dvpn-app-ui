import React from "react";
import styles from "./loader.module.scss";
import LoadingIndicator from "./LoadingIndicator";
import { useSelector } from "react-redux";

const Loader = () => {
  const { message } = useSelector((state) => state.alerts.loader);
  return (
    <div className={styles.root}>
      <LoadingIndicator />
      <span>{message}</span>
    </div>
  );
};

export default Loader;
