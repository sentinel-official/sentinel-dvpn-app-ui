import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./list-layout.module.scss";
import Header from "@containers/common/Header";
import SearchBox from "@containers/ListLayout/SearchBox";
import Filters from "@containers/ListLayout/Filters";
import QuickConnect from "@containers/ListLayout/QuickConnect";

const ListLayout = () => {
  return (
    <div className={styles.root}>
      <section className={`${styles.header} mb-2`}>
        <section className={styles.top}>
          <Header />
        </section>
        <section className={`${styles.bottom} px-16`}>
          <SearchBox />
          <Filters />
          <QuickConnect />
        </section>
      </section>
      <section className={`${styles.outlet} px-16`}>
        <Outlet />
      </section>
    </div>
  );
};

export default ListLayout;
