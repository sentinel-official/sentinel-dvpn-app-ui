import React from "react";
import Card from "../../components/Card";
import styles from "./balance-card.module.scss";
import BalanceIcon from "../../assets/icons/balance-icon.svg";
import ReloadIcon from "../../assets/icons/reload-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../../helpers/data.format";
import { withLoader } from "../../actions/loader.action";
import {
  dispatchCurrentPrice,
  dispatchGetAccountBalance,
  dispatchGetAvailablePlans,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
} from "../../actions/home.actions";

const BalanceCard = () => {
  const dispatch = useDispatch();
  const { balance, plan, subscription } = useSelector((state) => state.home);
  const handleReloader = () => {
    const dispatchers = [
      dispatchGetAccountBalance(),
      dispatchGetIPAddress(),
      dispatchCurrentPrice(),
    ];
    if (plan && plan.providerAddress === null) {
      dispatchers.push(dispatchGetAvailablePlans());
    }
    if (Object.values(subscription).length === 0) {
      dispatchers.push(dispatchGetUserSubscriptions());
    }
    dispatch(withLoader(dispatchers));
  };
  return (
    <Card className={styles.root}>
      <section className={styles.left}>
        <img src={BalanceIcon} alt="" />
      </section>
      <section className={styles.middle}>
        <span className={styles.title}>Your Balance</span>
        <span className={styles.description}>
          {`${formatAmount(balance / 1e6)}`} DVPN
        </span>
      </section>
      <section className={styles.right}>
        <Button
          variant={variants.TRANSPARENT}
          icon={ReloadIcon}
          onClick={handleReloader}
          className={`${styles["reload-btn"]}`}
        />
      </section>
    </Card>
  );
};

export default BalanceCard;
