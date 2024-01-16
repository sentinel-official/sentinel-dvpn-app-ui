import React from "react";
import Modal from "../../components/Modal";
import TimeIcon from "../../assets/icons/time-icon.svg";
import styles from "./styles.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_RENEW_SUBSCRIPTION } from "../../redux/alerts.reducer";
import { withLoader } from "../../actions/loader.actions";
import { subscribeToPlanAction } from "../../actions/user.actions";

const RenewSubscriptionModal = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.account.plan);
  const [price, setPrice] = React.useState(0.0);

  React.useEffect(() => {
    if (plan && plan.providerAddress) {
      plan.prices.forEach((price) => {
        if (price.denom === "udvpn") {
          const amount = Number.parseFloat(Number.parseInt(price.amount) / 1e6);
          setPrice(amount);
        }
      });
    }
  }, [dispatch, plan]);

  const handleRenewSubcription = () => {
    const payload = {
      denom: "udvpn",
      address: plan.providerAddress,
    };
    dispatch(
      withLoader({
        dispatchers: [subscribeToPlanAction(payload)],
        message: "Renewing your Subscription",
      })
    );
  };

  const closeModal = () => {
    dispatch(SHOW_RENEW_SUBSCRIPTION(false));
  };

  if (plan && plan.providerAddress) {
    return (
      <Modal>
        <div className={styles["renew-subscription-modal"]}>
          <img src={TimeIcon} alt="" />
          <span className={styles.title}>Your subscription has expired</span>
          <span className={styles.description}>
            Renew your on-chain subscription to enjoy Sentinel dVPN.
          </span>
          <Button
            onClick={handleRenewSubcription}
            title={`Renew for ${price} DVPN`}
            variant={variants.primary}
          />
          <Button
            title={"Cancel"}
            onClick={closeModal}
            variant={variants.secondary}
          />
        </div>
      </Modal>
    );
  }
  return null;
};

export default RenewSubscriptionModal;
