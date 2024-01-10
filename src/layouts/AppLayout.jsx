import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";

const AppLayout = () => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles["tab-bar"]}>
        <Link to={"/onboarding"}>ON BOARDING</Link>
        <Link to={"/app"}>APP</Link>
      </div>
    </div>
  );
};

export default AppLayout;
