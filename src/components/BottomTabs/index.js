import React from "react";
import styles from "./bottom-tabs.module.scss";
import { tabs } from "./constants";
import Tab from "./Tab";
import { useLocation } from "react-router-dom";

const BottomTabs = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      {tabs.map((tab) => (
        <Tab
          key={tab.title}
          icon={tab.icon}
          title={tab.title}
          href={tab.href}
          isActive={location.pathname === tab.href}
        />
      ))}
    </div>
  );
};

export default BottomTabs;
