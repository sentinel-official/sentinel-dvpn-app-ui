import BalanceCard from "@containers/Home/BalanceCard";
import BottomCard from "@containers/Home/BottomCard";
import Map from "@containers/Home/Map";
import React from "react";
import styles from "./home.module.scss";
const Home = () => {
  return (
    <div className={`${styles.root}`}>
      <section className={`${styles.container} pt-16 pb-8`}>
        <section className={`${styles.card} px-16`}>
          <BalanceCard />
        </section>
        <Map />
        <section className={`${styles.card} px-16`}>
          <BottomCard />
        </section>
      </section>
    </div>
  );
};

export default Home;
