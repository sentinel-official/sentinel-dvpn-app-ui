import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { variants } from "../../components/Card";
import QRCode from "react-qr-code";
import styles from "./qr-code.module.scss";
import Button from "../../components/Button";
import copy from "copy-to-clipboard";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";

const QRCodeCard = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.device.walletAddress);
  return (
    <Card className={styles.root} variant={variants.SECONDARY}>
      <section className={styles["wallet-address"]}>
        <span className={styles.title}>Wallet Address</span>
        <span className={styles.address}>{walletAddress}</span>
      </section>
      <QRCode value={walletAddress} />
      <Button
        onClick={() => {
          copy(walletAddress);
          dispatch(
            CHANGE_SUCCESS_ALERT({
              show: true,
              message: "Wallet Address Copied!",
            })
          );
        }}
        className={styles["copy-wallet-address"]}
        title={"Copy Address"}
        variant={variants.PRIMARY}
      />
    </Card>
  );
};

export default QRCodeCard;
