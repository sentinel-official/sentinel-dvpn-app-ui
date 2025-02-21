import React from "react";
import styles from "./no-plans-retry.module.scss";
import { BTN_VARIANTS, Button, Text } from "@components/index";
import useModal from "@hooks/use-modal";
import { useDispatch } from "react-redux";
import { dispatchFetchAvailablePlans, dispatchFetchAvailableSubscriptions } from "@actions/user.actions";
import useLoader from "@hooks/use-loader";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import { useAuthSelector } from "@hooks/use-selector";

const NoSubscriptionsRetry = () => {
  const showAlert = useAlerts();
  const { hideModal } = useModal();
  const dispatch = useDispatch();
  const { startLoader, stopLoader } = useLoader();
  const { walletAddress } = useAuthSelector();

  const retry = async () => {
    try {
      hideModal();
      startLoader({ message: "fetching_subscriptions" });
      await dispatch(dispatchFetchAvailableSubscriptions(walletAddress));
    } catch (e) {
      showAlert({
        type: ALERT_TYPES.error,
        message: "error_fetching_subscriptions",
      });
    } finally {
      stopLoader();
    }
  };
  return (
    <div className={`${styles.root} px-16 py-32`}>
      <Text text={"no_subcriptions_retry_desc"} className="fw-5 fs-18  mb-24" />
      <Text text={"please_try_again"} className="fw-4 fs-14 text-8a94a3  mb-36" />
      <section className={styles.btns}>
        <Button variant={BTN_VARIANTS.SECONDARY} className="mr-6" onClick={hideModal}>
          <Text text={"close"} className="py-8" />
        </Button>
        <Button variant={BTN_VARIANTS.PRIMARY} className="ml-6" onClick={retry}>
          <Text text={"retry"} className="py-8" />
        </Button>
      </section>
    </div>
  );
};

export default NoSubscriptionsRetry;
