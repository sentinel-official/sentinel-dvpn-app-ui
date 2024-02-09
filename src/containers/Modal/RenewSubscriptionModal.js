import React from "react";
import TimeIcon from "../../assets/icons/time-icon.svg";
import styles from "./renew.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../redux/reducers/alerts.reducer";
import { withLoader } from "../../actions/loader.action";
import {
  dispatchGetUserSubscriptions,
  dispatchSubscribeToPlan,
} from "../../actions/home.actions";

const RenewSubscriptionModal = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.home.plan);
  const [price, setPrice] = React.useState(0.0);

  React.useEffect(() => {
    if (plan && plan.providerAddress) {
      const amount = Number.parseFloat(Number.parseInt(plan.amount) / 1e6);
      setPrice(amount);
    }
  }, [dispatch, plan]);

  const handleRenewSubcription = async () => {
    try {
      const payload = {
        denom: "udvpn",
        address: plan.providerAddress,
      };
      dispatch(
        withLoader([
          CHANGE_MODAL_STATE({ show: false, type: "" }),
          dispatchSubscribeToPlan(payload),
          dispatchGetUserSubscriptions(),
        ])
      );
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: "Failed to Subscribe",
        })
      );
    }
  };

  return (
    <div className={styles["renew-subscription-modal"]}>
      <img src={TimeIcon} alt="" />
      <span className={styles.title}>Your subscription has expired</span>
      <span className={styles.description}>
        Renew your on-chain subscription to enjoy Sentinel dVPN.
      </span>
      <Button
        className={styles.btn}
        title={`Renew for ${price} DVPN`}
        variant={variants.PRIMARY}
        onClick={handleRenewSubcription}
      />
      <Button
        className={styles.btn}
        title={"Cancel"}
        variant={variants.SECONDARY}
        onClick={() => {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
        }}
      />
    </div>
  );
};

export default RenewSubscriptionModal;
