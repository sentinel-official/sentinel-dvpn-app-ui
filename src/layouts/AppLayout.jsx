import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";
import HomeIcon from "../assets/icons/tab-home-icon.svg";
import NodesIcon from "../assets/icons/tab-nodes-icon.svg";
import AccountIcon from "../assets/icons/tab-account-icon.svg";
import SettingsIcon from "../assets/icons/tab-settings-icon.svg";

const tabs = [
  {
    title: "Nodes",
    logo: NodesIcon,
    path: "/app/continents",
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
const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles["tab-bar"]}>
        <button
          onClick={(event) => navigateTo(event, "/app")}
          className={`${styles.tab} ${
            location.pathname === "/app" ? styles.selected : ""
          }`}
        >
          <img src={HomeIcon} alt="" />
          <span>{"Home"}</span>
        </button>

        {tabs.map((tab) => (
          <button
            key={tab.title}
            onClick={(event) => navigateTo(event, tab.path)}
            className={`${styles.tab} ${
              location.pathname.startsWith(tab.path) ? styles.selected : ""
            }`}
          >
            <img src={tab.logo} alt="" />
            <span>{tab.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppLayout;
