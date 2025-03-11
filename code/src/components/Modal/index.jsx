import useModal from "@hooks/use-modal";
import React, { Suspense, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import AnimatedLayout from "@navigation/AnimatedLayout";

import NoBalanceModal from "@containers/Modals/NoBalanceModal";
import AppUpdateModal from "@containers/Modals/AppUpdateModal";
import Subs from "@containers/Modals/SubscriptionModal";
import MPK from "@containers/Modals/ManagePrivateKey";
import Filters from "@containers/Modals/FiltersModal";
import Logout from "@containers/Modals/LogoutModal";
import NSR from "@containers/Modals/NoSubscriptionsRetry";
import NPR from "@containers/Modals/NoPlansRetry";
import RetryRegister from "@containers/Modals/RetryRegister";
import FeeGranterModal from "@containers/Modals/FeeGranterModal";
import PurchasePending from "@containers/Modals/PurchasePending";
import DeleteAccount from "@containers/Modals/DeleteAccount";
import NoInternet from "@containers/Modals/NoInternet";
import { useDispatch } from "react-redux";
import { STOP_LOADER } from "@reducers/loader.reducer";
import ReferEarn from "@containers/Modals/ReferEarn";

const types = {
  filters: Filters,
  logout: Logout,
  "manage-key": MPK,
  subscription: Subs,
  "no-subscriptions-retry": NSR,
  "no-plans-retry": NPR,
  "update-app": AppUpdateModal,
  "no-balance": NoBalanceModal,
  "retry-register": RetryRegister,
  "fee-grant": FeeGranterModal,
  "purchase-pending": PurchasePending,
  "delete-account": DeleteAccount,
  "no-internet": NoInternet,
  "refer-earn":ReferEarn
};

const ModalComponent = ({ name }) => {
  if (Object.keys(types).includes(name)) {
    const Component = types[name];
    return (
      <Suspense fallback={<></>}>
        <Component />
      </Suspense>
    );
  }
  return null;
};

const Modal = () => {
  const dispatch = useDispatch();
  const { hideModal, getModalDetails } = useModal();
  const { show, name, cancellable, variant = "primary" } = getModalDetails();

  useEffect(() => {
    if (show) {
      dispatch(STOP_LOADER());
    }
  }, [show, dispatch]);

  if (show) {
    return (
      <>
        {createPortal(
          <AnimatedLayout
            duration={0.5}
            variants={{
              hidden: { opacity: 1, x: 0, y: window.innerHeight / 4 },
              enter: {
                opacity: 1,
                x: 0,
                y: [window.innerHeight, -10, 10, -10, 10, 0],
              },
              exit: { opacity: 0, x: 0, y: 0 },
            }}
            className={`${styles.root} ${styles[variant]}`}
          >
            <div
              className={styles[`modal-backdrop`]}
              onClick={() => {
                if (cancellable && cancellable === "true") {
                  hideModal();
                }
              }}
            />
            <AnimatedLayout
              variants={{
                hidden: { opacity: 1, x: 0, y: window.innerHeight / 4 },
                enter: {
                  opacity: 1,
                  x: 0,
                  y: [0, -10, 10, -10, 10, 0],
                },
                exit: { opacity: 0, x: 0, y: 0 },
              }}
              duration={0.25}
              className={styles.container}
            >
              <ModalComponent name={name} />
            </AnimatedLayout>
          </AnimatedLayout>,
          document.body
        )}
      </>
    );
  }
  return null;
};

export default Modal;
