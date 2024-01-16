import React from "react";
import styles from "../styles/account-screen.module.scss";
import Card from "../../components/Card";
import { useSelector } from "react-redux";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import AcceptedTokensIcon from "../../assets/icons/accepted-tokens-icon.svg";
import QRCodeCard from "../../containers/QRCodeCard";

const TokensAccepted = () => {
  return (
    <>
      <section className={styles["how-to-deposit"]}>
        <span className={styles.title}>How to deposit?</span>
        <span className={styles.description}>
          You can deposit DVPN to your wallet from any exchange or wallet. Just
          send them to your wallet address. You can copy your wallet address by
          clicking on the button below or by scanning the QR code.
        </span>
      </section>
      <section className={styles["tokens-accepted"]}>
        <span className={styles.title}>Tokens Accepted</span>
        <section className={styles.token}>
          <img src={AcceptedTokensIcon} alt="" />
          <span>DVPN</span>
        </section>
      </section>
    </>
  );
};

const BalanceCard = () => {
  const { balance, price } = useSelector((state) => state.account);

  return (
    <Card variant="secondary">
      <div className={styles["balance-card"]}>
        <span className={styles.title}>Your Balance</span>
        <section className={styles["balance-dvpn"]}>
          <img src={BalanceIcon} alt="" />
          <section className={styles.balance}>
            <span className={styles.amount}>{balance} DVPN</span>
          </section>
        </section>
        <span className={styles["balance-dollors"]}>~ ${price * balance}</span>
      </div>
    </Card>
  );
};

const AccountScreen = () => {
  return (
    <div className={styles.root}>
      <span className={styles.header}>Account</span>
      <BalanceCard />
      <TokensAccepted />
      <QRCodeCard />
    </div>
  );
};

export default AccountScreen;
