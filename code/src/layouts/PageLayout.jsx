import Header from "@containers/common/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./page-layout.module.scss";
const PageLayout = () => {
  return (
    <div className={styles.root}>
      <section className={styles.header}>
        <Header />
      </section>
      <section className={`${styles.outlet} px-16 mt-2`}>
        <Outlet />
      </section>
    </div>
  );
};

export default PageLayout;
