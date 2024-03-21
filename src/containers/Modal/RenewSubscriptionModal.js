import React from "react";
import TimeIcon from "../../assets/icons/time-icon.svg";
import styles from "./renew.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
  CHANGE_SUCCESS_ALERT,
} from "../../redux/reducers/alerts.reducer";
import {
  withLoader,
  withSingleDispatcherLoader,
} from "../../actions/loader.action";
import {
  dispatchGetAvailablePlans,
  dispatchGetUserSubscriptions,
  dispatchSubscribeToPlan,
} from "../../actions/home.actions";

const RenewSubscriptionModal = () => {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.home.plan);
  const { balance } = useSelector((state) => state.home);

  const [price, setPrice] = React.useState(0.0);

  React.useEffect(() => {
    const fetchPlans = async () => {
      try {
        await dispatch(withSingleDispatcherLoader(dispatchGetAvailablePlans()));
        if (plan && plan.amount === 0) {
          dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
          dispatch(
            CHANGE_ERROR_ALERT({ show: true, message: "No Plans available" })
          );
        }
      } catch (e) {
        dispatch(CHANGE_MODAL_STATE({ show: false, type: "" }));
        dispatch(
          CHANGE_ERROR_ALERT({ show: true, message: "Failed to fetch Plans" })
        );
      }
    };
    if (plan && plan.providerAddress) {
      const amount = Number.parseFloat(Number.parseInt(plan.amount) / 1e6);
      setPrice(amount);
    } else {
      fetchPlans();
    }
  }, [dispatch, plan]);

  const handleRenewSubcription = async () => {
    if (balance < plan.amount) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
      return;
    }
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
          dispatch(
            CHANGE_SUCCESS_ALERT({
              show: true,
              message: "You have subscribed successfully!",
            })
          ),
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
      <span className={styles.title}>
        You do not have an active subscription
      </span>
      <span className={styles.description}>
        Purchase one month of subscription to enjoy Sentinel dVPN
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
