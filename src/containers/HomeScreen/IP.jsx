import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const HomeScreenIP = () => {
  const { ip } = useSelector((state) => state.account);
  return (
    <section className={styles.ip}>
      <span className={styles.title}>Your IP:</span>
      <span className={styles.address}>{ip}</span>
    </section>
  );
};

export default HomeScreenIP;
