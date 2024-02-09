import React from "react";
import styles from "./ip.module.scss";
import { useSelector } from "react-redux";
const IP = () => {
  const ip = useSelector((state) => state.home.ip);
  return (
    <span className={styles.text}>
      <span className={styles.title}>Your IP: </span>
      {ip}
    </span>
  );
};

export default IP;
