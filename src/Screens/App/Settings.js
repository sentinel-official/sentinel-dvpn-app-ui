import React from "react";
import DNSCard from "../../containers/Settings/DNSCard";
import LegalCards from "../../containers/Settings/LegalCards";
import styles from "./settings.module.scss";
const Settings = () => {
  return (
    <div className={styles.root}>
      <span className={styles.header}>Settings</span>
      <DNSCard />
      <LegalCards />
    </div>
  );
};

export default Settings;
