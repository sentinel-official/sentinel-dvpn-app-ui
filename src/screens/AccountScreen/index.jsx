import React from "react";
import styles from "../styles/account-screen.module.scss";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import AcceptedTokensIcon from "../../assets/icons/accepted-tokens-icon.svg";
import QRCode from "react-qr-code";
import Button, { variants } from "../../components/Button";
import copy from "copy-to-clipboard";
import { SET_SHOW_SUCCESS_ALERT } from "../../redux/alerts.reducer";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const { balance, price } = useSelector((state) => state.account);
  const { walletAddress } = useSelector((state) => state.user);

  const copyWalletAddress = (event) => {
    event.preventDefault();
    copy(walletAddress);
    dispatch(
      SET_SHOW_SUCCESS_ALERT({
        showSuccessAlert: true,
        message: "Copied Successfully!",
      })
    );
  };

  return (
    <div className={styles.root}>
      <span className={styles.header}>Account</span>
      <Card>
        <div className={styles["balance-card"]}>
          <span className={styles.title}>Your Balance</span>
          <section className={styles["balance-dvpn"]}>
            <img src={BalanceIcon} alt="" />
            <section className={styles.balance}>
              <span className={styles.amount}>{balance} DVPN</span>
            </section>
          </section>
          <span className={styles["balance-dollors"]}>
            ~ ${price * balance}
          </span>
        </div>
      </Card>
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
      <Card>
        <section className={styles["qr-code-card"]}>
          <QRCode value={walletAddress} />
          <section className={styles["wallet-address"]}>
            <span className={styles.title}>Wallet Address</span>
            <span className={styles.address}>{walletAddress}</span>
          </section>
          <Button
            onClick={copyWalletAddress}
            title={"Copy Address"}
            variant={variants.primary}
          />
        </section>
      </Card>
    </div>
  );
};

export default AccountScreen;
