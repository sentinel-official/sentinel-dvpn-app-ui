import React from "react";
import styles from "../styles/account-screen.module.scss";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import QRCodeCard from "../../containers/QRCodeCard";
import formatamount from "../../helpers/formatAmount";
import Button, { variants } from "../../components/Button";
import copy from "copy-to-clipboard";
import { SET_SHOW_SUCCESS_ALERT } from "../../redux/alerts.reducer";

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
            <span className={styles.amount}>{formatamount(balance)} DVPN</span>
          </section>
        </section>
        <span className={styles["balance-dollors"]}>
          ~ ${formatamount(price * balance)}
        </span>
      </div>
    </Card>
  );
};

const CopyPrivateKey = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.device.mnemonic);
  const copyMnemonic = () => {
    copy(mnemonic);
    dispatch(
      SET_SHOW_SUCCESS_ALERT({
        showSuccessAlert: true,
        message: "Mnemonic copied successfully!",
      })
    );
  };
  return (
    <Button
      variant={variants.primary}
      title={"Copy Mnemonic"}
      onClick={copyMnemonic}
    />
  );
};

const AccountScreen = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.root}>
      <span className={styles.header}>Account</span>
      <BalanceCard />
      <QRCodeCard />
      <CopyPrivateKey />
      <TokensAccepted />
    </div>
  );
};

export default AccountScreen;
