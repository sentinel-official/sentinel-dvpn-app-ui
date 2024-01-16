import React from "react";
import styles from "./styles.module.scss";
import LoadingIndicator from "./LoadingIndicator";
import { useSelector } from "react-redux";

const Loader = () => {
  const { loadingMessage } = useSelector((state) => state.alerts);
  return (
    <div className={styles.root}>
      <LoadingIndicator />
      <span>{loadingMessage}</span>
    </div>
  );
};

export default Loader;
