import React from "react";
import styles from "./subscription.module.scss";
import { BTN_VARIANTS, Button, Text } from "@components/index";
import useModal from "@hooks/use-modal";
import { useAuthSelector, useUserSelector } from "@hooks/use-selector";
import formatAmount from "@helpers/formatAmount";
import useOpenWindow from "@hooks/use-open-window";
import { APP_DENOM, links } from "@root/constants";
import { parsePlanDuration } from "@helpers/parse.data";
import { useDispatch } from "react-redux";
import { dispatchCreateNewSubscription, dispatchFetchAvailableSubscriptions } from "@actions/user.actions";
import useLoader from "@hooks/use-loader";
import useRefetch from "@hooks/use-refetch";

const SubscriptionModal = () => {
  const dispatch = useDispatch();
  const { startLoader, stopLoader, changeMessage } = useLoader();
  const { hideModal, showModal } = useModal();
  const { plan, isPlansFetched, isSubscriptionFetched, balance } = useUserSelector();
  const { openWindow } = useOpenWindow();
  const { walletAddress } = useAuthSelector();
  const refetch = useRefetch();

  const subscribe = async () => {
    if (balance >= plan.price) {
      const payload = {
        denom: APP_DENOM,
        address: plan.providerAddress,
      };
      try {
        hideModal();
        startLoader({ message: "creating_new_subscription" });
        await dispatch(dispatchCreateNewSubscription(payload));
        changeMessage({ message: "fetching_subscription_details" });
        await dispatch(dispatchFetchAvailableSubscriptions(walletAddress));
        return;
      } catch (e) {
      } finally {
        await refetch();
        stopLoader();
      }

      return;
    }

    showModal({ name: "no-balance" });
    return;
  };

  if (!isSubscriptionFetched) {
    React.useEffect(() => {
      showModal({ name: "no-subscriptions-retry" });
    }, []);
    return null;
  }

  if (!isPlansFetched) {
    React.useEffect(() => {
      showModal({ name: "no-plans-retry" });
    }, []);
    return null;
  }

  return (
    <div className={`${styles.root} px-16 py-28`}>
      <Text
        text={"modal_subscription_title"}
        data={{ days: parsePlanDuration(plan.duration) || 0 }}
        className="fw-5 fs-22 mb-12"
      />
      <section className="mb-36">
        <Text
          text={"modal_subscription_description_1"}
          className="fw-4 fs-14 text-8a94a3"
          data={{ days: parsePlanDuration(plan.duration) || 0 }}
        />
        <Text
          text={"modal_no_subscriptions_link_text"}
          className="fw-5 fs-14 text-link mx-4"
          onClick={() => openWindow({ url: links.RENEW_FIND_MORE })}
        />
        <Text
          text={"modal_subscription_description_2"}
          className="fw-4 fs-14 text-8a94a3"
          data={{ days: parsePlanDuration(plan.duration) || 0 }}
        />
      </section>
      <Button
        className=" mb-8"
        onClick={subscribe}
      >
        <Text
          text={"renew_at_price"}
          data={{ price: formatAmount((plan.price || 0) / 1e6) || 0 }}
          className="fw-5 fs-14 py-8"
        />
      </Button>
      <Button
        variant={BTN_VARIANTS.SECONDARY}
        onClick={hideModal}
      >
        <Text
          text={"cancel"}
          className="fw-5 fs-14 py-8"
        />
      </Button>
    </div>
  );
};

export default SubscriptionModal;
