import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";
import HomeIcon from "../assets/icons/tab-home-icon.svg";
import NodesIcon from "../assets/icons/tab-nodes-icon.svg";
import AccountIcon from "../assets/icons/tab-account-icon.svg";
import SettingsIcon from "../assets/icons/tab-settings-icon.svg";
import { useSelector } from "react-redux";

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
  const { walletAddress, deviceToken } = useSelector((state) => state.user);

  const navigateTo = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  if (walletAddress && deviceToken) {
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
            disabled={location.pathname === "/app"}
          >
            <img src={HomeIcon} alt="" />
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
                <img src={tab.logo} alt="" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <Navigate to={"/onboarding"} />;
};

export default AppLayout;
