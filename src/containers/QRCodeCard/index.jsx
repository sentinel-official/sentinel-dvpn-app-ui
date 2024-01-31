import React from "react";
import styles from "./styles.module.scss";
import Card from "../../components/Card";
import QRCode from "react-qr-code";
import Button, { variants } from "../../components/Button";
import { SET_SHOW_SUCCESS_ALERT } from "../../redux/alerts.reducer";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";

const QRCodeCard = () => {
  const dispatch = useDispatch();

  const { walletAddress } = useSelector((state) => state.device);

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
    <Card variant="secondary">
      <section className={styles["qr-code-card"]}>
        <section className={styles["wallet-address"]}>
          <span className={styles.title}>Wallet Address</span>
          <span className={styles.address}>{walletAddress}</span>
        </section>
        <QRCode value={walletAddress} />
        <Button
          onClick={copyWalletAddress}
          title={"Copy Address"}
          variant={variants.primary}
        />
      </section>
    </Card>
  );
};

export default QRCodeCard;
