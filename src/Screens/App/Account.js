import React from "react";
import styles from "./account.module.scss";
import BalanceCard from "../../containers/Account/BalanceCard";
import QRCodeCard from "../../containers/Account/QRCodeCard";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";

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
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.device.mnemonic);
  return (
    <div className={styles.root}>
      <span className={styles.header}>Account</span>
      <BalanceCard />
      <QRCodeCard />
      <Button
        onClick={() => {
          copy(mnemonic);
          dispatch(
            CHANGE_SUCCESS_ALERT({
              show: true,
              message: "Mnemonic Copied!",
            })
          );
        }}
        className={styles["copy-mnemonic"]}
        title={"Copy Mnemonic"}
        variant={variants.PRIMARY}
      />
      <HowToDeposit />
    </div>
  );
};

export default Account;
