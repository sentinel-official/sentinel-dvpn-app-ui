import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";

import { useDispatch, useSelector } from "react-redux";
import RenewSubscriptionModal from "../containers/HomeScreen/RenewSubscriptionModal";

import { withLoader } from "../actions/loader.actions";

import {
  SHOW_NO_BALANCE,
  SHOW_RENEW_SUBSCRIPTION,
} from "../redux/alerts.reducer";
import BottomTabs from "../containers/BottomTabs";
import NoBalanceModal from "../components/NoBalanceModal";
import { fetchUserDetails } from "../actions/device.actions";
import { connectAction } from "../actions/vpn.actions";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { walletAddress, deviceToken } = useSelector((state) => state.device);
  const { showRenewSubscription, isUserDetailsFetched, isShowNoBalance } =
    useSelector((state) => state.alerts);
  const { balance, subscription } = useSelector((state) => state.account);
  const node = useSelector((state) => state.device.selectedNode);

  React.useLayoutEffect(() => {
    if (walletAddress && deviceToken && !isUserDetailsFetched) {
      dispatch(
        withLoader({
          dispatchers: [fetchUserDetails({ deviceToken, walletAddress })],
          message: "Fetching your details...",
        })
      );
    }
  }, [dispatch, walletAddress, deviceToken, isUserDetailsFetched]);

  if (walletAddress && deviceToken) {
    return (
      <>
        {showRenewSubscription && <RenewSubscriptionModal />}
        {isShowNoBalance && (
          <NoBalanceModal
            balance={balance}
            onCancel={() => dispatch(SHOW_NO_BALANCE(false))}
          />
        )}
        <div className={styles.root}>
          <div className={styles.outlet}>
            <Outlet />
          </div>
          <BottomTabs />
        </div>
      </>
    );
  }

  return <Navigate to={"/onboarding"} />;
};

export default AppLayout;
