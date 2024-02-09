import React from "react";
import styles from "./list-layout.module.scss";
import { Outlet } from "react-router-dom";
import PageTitle from "../containers/NodesScreens/PageTitle";
import SearchBox from "../containers/NodesScreens/SearchBox";
import QuickConnectButton from "../containers/NodesScreens/QuickConnectButton";
import Filter from "../containers/NodesScreens/Filter";

const ListLayout = () => {
  return (
    <div className={styles.root}>
      <section className={styles.details}>
        <PageTitle />
        <section className={styles.bottom}>
          <SearchBox />
          <Filter />
          <QuickConnectButton />
        </section>
      </section>
      <section className={styles.lists}>
        <Outlet />
      </section>
    </div>
  );
};

export default ListLayout;
