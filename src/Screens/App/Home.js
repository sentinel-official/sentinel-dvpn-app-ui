import React from "react";
import {
  BalanceCard,
  ConnectButton,
  IP,
  Map,
  Protected,
  SelectedNode,
} from "../../containers/HomeScreen";
import Card from "../../components/Card";
import styles from "./home.module.scss";
import { useSelector } from "react-redux";

const Home = () => {
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);

  return (
    <div className={styles.root}>
      <Map />
      <div className={styles.overlay}>
        <section className={styles.top}>
          <BalanceCard />
        </section>
        <section className={styles.bottom}>
          <section>
            <Card>
              <section className={styles["connection-card"]}>
                <SelectedNode />
                <IP />
              </section>
              {!isVPNConnected && <Protected />}
            </Card>
          </section>
          <section className={styles["connect-button"]}>
            <ConnectButton />
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
