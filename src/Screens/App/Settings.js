import React from "react";
import DNSCard from "../../containers/Settings/DNSCard";
import LegalCards from "../../containers/Settings/LegalCards";
import styles from "./settings.module.scss";
import ShareLogButton from "../../containers/Settings/ShareLogButton";
const Settings = () => {
  return (
    <div className={styles.root}>
      <span className={styles.header}>Settings</span>
      <DNSCard />
      <LegalCards />
      <ShareLogButton />
    </div>
  );
};

export default Settings;
