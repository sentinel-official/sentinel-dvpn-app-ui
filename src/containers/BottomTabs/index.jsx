import React from "react";
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icons/tab-home-icon.svg";
import NodesIcon from "../../assets/icons/tab-nodes-icon.svg";
import AccountIcon from "../../assets/icons/tab-account-icon.svg";
import SettingsIcon from "../../assets/icons/tab-settings-icon.svg";
const tabs = [
  {
    title: "Nodes",
    logo: NodesIcon,
    path: "/app/countries",
  },
  {
    title: "Account",
    logo: AccountIcon,
    path: "/app/account",
  },
  {
    title: "Settings",
    logo: SettingsIcon,
    path: "/app/settings",
  },
];

const BottomTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };
  return (
    <div className={styles["tab-bar"]}>
      <button
        onClick={(event) => navigateTo(event, "/app")}
        className={`${styles.tab} ${
          location.pathname === "/app" ? styles.selected : ""
        }`}
        disabled={location.pathname === "/app"}
      >
        <div className={styles.icon}>
          <img src={HomeIcon} alt="" />
        </div>
        <span>{"Home"}</span>
      </button>

      {tabs.map((tab) => {
        const isSelected = location.pathname.startsWith(tab.path);
        return (
          <button
            key={tab.title}
            onClick={(event) => navigateTo(event, tab.path)}
            className={`${styles.tab} ${isSelected ? styles.selected : ""}`}
            disabled={isSelected}
          >
            <div className={styles.icon}>
              <img src={tab.logo} alt="" />
            </div>
            <span>{tab.title}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomTabs;
