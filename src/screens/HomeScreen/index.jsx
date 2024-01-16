import React from "react";
import styles from "../styles/home-screen.module.scss";
import Card from "../../components/Card";

import HomeScreenIP from "../../containers/HomeScreen/IP";
import SelectedNode from "../../containers/HomeScreen/SelectedNode";
import Balance from "../../containers/HomeScreen/Balance";
import Protected from "../../containers/HomeScreen/Protected";
import QuickConnect from "../../containers/HomeScreen/QuickConnect";

const HomeScreenTop = () => {
  return (
    <section className={styles.top}>
      <Balance />
    </section>
  );
};

const HomeScreenBottom = () => {
  return (
    <section className={styles.bottom}>
      <Card>
        <div className={styles["ip-content"]}>
          <SelectedNode />
          <HomeScreenIP />
        </div>
        <Protected />
      </Card>
      <QuickConnect />
    </section>
  );
};

const HomeScreen = ({ map }) => {
  return (
    <div className={styles.root}>
      <div style={{ width: "100%", height: "100%" }}>
        {map}
      </div>
      <div className={styles.overlay}>
        <HomeScreenTop />
        <HomeScreenBottom />
      </div>
    </div>
  );
};

export default React.memo(HomeScreen);
