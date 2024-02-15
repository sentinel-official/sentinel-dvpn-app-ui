import React from "react";
import styles from "./account.module.scss";
import BalanceCard from "../../containers/Account/BalanceCard";
import QRCodeCard from "../../containers/Account/QRCodeCard";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const HowToDeposit = () => {
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
    </>
  );
};

const Account = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <span className={styles.header}>Account</span>
      <BalanceCard />
      <QRCodeCard />
      <Button
        onClick={() => {
          navigate("/app/private-key");
        }}
        className={styles["copy-mnemonic"]}
        title={"Show Mnemonic"}
        variant={variants.PRIMARY}
      />
      <HowToDeposit />
    </div>
  );
};

export default Account;
