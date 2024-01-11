import React from "react";
import styles from "../styles/home-screen.module.scss";
import Map from "../../components/Map";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import QuiciConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import InfoIcon from "../../assets/icons/info-icon.svg";

import Button, { variants } from "../../components/Button";

const HomeScreen = () => {
  const { latitude, longitude } = useSelector((state) => state.map);
  const { balance } = useSelector((state) => state.account);
  const { ip } = useSelector((state) => state.user);

  return (
    <div className={styles.root}>
      <Map latitude={latitude} longitude={longitude} />
      <div className={styles.overlay}>
        <section className={styles.top}>
          <Card>
            <div className={styles["balance-content"]}>
              <img src={BalanceIcon} alt="" />
              <section className={styles.balance}>
                <span className={styles.title}>Your Balance</span>
                <span className={styles.amount}>{balance} DVPN</span>
              </section>
            </div>
          </Card>
        </section>
        <section className={styles.bottom}>
          <Card>
            <div className={styles["ip-content"]}>
              <span className={styles.muted}>Server is not selected</span>
              <section className={styles.ip}>
                <span className={styles.title}>Your IP:</span>
                <span className={styles.address}>{ip}</span>
              </section>
            </div>
            <div className={styles.protected}>
              <img src={InfoIcon} alt="" />
              <span>You're not protected</span>
            </div>
          </Card>
          <Button
            title={"Quick Connect"}
            icon={QuiciConnectIcon}
            variant={variants.primary}
          />
        </section>
      </div>
    </div>
  );
};

export default React.memo(HomeScreen);
