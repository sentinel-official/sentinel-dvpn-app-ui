import React from "react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import styles from "./styles.module.scss";
import formatamount from "../../helpers/formatAmount";
import ReloadIcon from "../../assets/icons/reload-icon.svg";
import { withLoader } from "../../actions/loader.actions";
import {
  dispatchGetBalance,
  dispatchGetIpAddress,
  dispatchGetPlans,
  dispatchGetSubscriptions,
} from "../../actions/user.actions";

const Balance = () => {
  const dispatch = useDispatch();
  const { balance, plan, subscription } = useSelector((state) => state.account);
  const { walletAddress, deviceToken } = useSelector((state) => state.device);

  const refresh = () => {
    const dispatchers = [
      dispatchGetBalance(walletAddress),
      dispatchGetIpAddress(deviceToken),
    ];
    if (Object.values(plan).length === 0) {
      dispatchers.push(dispatchGetPlans());
    }
    if (Object.values(subscription).length === 0) {
      dispatchers.push(dispatchGetSubscriptions(walletAddress));
    }
    dispatch(withLoader({ dispatchers }));
  };

  return (
    <Card>
      <div className={styles["balance-content"]}>
        <section className={styles.left}>
          <img src={BalanceIcon} alt="" />
          <section className={styles.balance}>
            <span className={styles.title}>Your balance</span>
            <span className={styles.amount}>{formatamount(balance)} DVPN</span>
          </section>
        </section>
        <section className={styles.right}>
          <button onClick={refresh}>
            <img src={ReloadIcon} alt="" />
          </button>
        </section>
      </div>
    </Card>
  );
};

export default Balance;
