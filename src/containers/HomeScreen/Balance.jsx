import React from "react";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import styles from "./styles.module.scss";
const Balance = () => {
  const { balance } = useSelector((state) => state.account);

  return (
    <Card>
      <div className={styles["balance-content"]}>
        <img src={BalanceIcon} alt="" />
        <section className={styles.balance}>
          <span className={styles.title}>Your Balance</span>
          <span className={styles.amount}>{balance} DVPN</span>
        </section>
      </div>
    </Card>
  );
};

export default Balance;
