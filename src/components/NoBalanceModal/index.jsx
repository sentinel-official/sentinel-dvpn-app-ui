import React from "react";
import styles from "./styles.module.scss";
import Modal from "../Modal";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import Button, { variants } from "../Button";

const NoBalanceModal = ({ balance, onCancel }) => {
  return (
    <Modal>
      <div className={styles["no-balance-modal"]}>
        <span className={styles.title}>No Balance</span>
        <span className={styles.description}>
          You have no balance in your account!
        </span>
        <section className={styles.balance}>
          <img src={BalanceIcon} alt="" />
          <span className={styles.amount}>{balance} DVPN</span>
        </section>
        <Button variant={variants.primary} onClick={onCancel} title={"OK"} />
      </div>
    </Modal>
  );
};

export default NoBalanceModal;
