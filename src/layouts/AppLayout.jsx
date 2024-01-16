import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from "./styles/app-layout.module.scss";

import { useDispatch, useSelector } from "react-redux";
import RenewSubscriptionModal from "../containers/HomeScreen/RenewSubscriptionModal";
import {
  dispatchFetchCurrentPrice,
  dispatchGetBalance,
  dispatchGetIpAddress,
  dispatchGetPlans,
  fetchMySubscriptions,
} from "../actions/user.actions";
import { withLoader } from "../actions/loader.actions";
import { fetchCountriesAction } from "../actions/nodes.actions";
import { SET_USER_DETAILS_FETCHED } from "../redux/alerts.reducer";
import BottomTabs from "../containers/BottomTabs";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { walletAddress, deviceToken } = useSelector((state) => state.device);
  const { showRenewSubscription, isUserDetailsFetched } = useSelector(
    (state) => state.alerts
  );

  React.useLayoutEffect(() => {
    if (walletAddress && deviceToken && !isUserDetailsFetched) {
      dispatch(
        withLoader({
          dispatchers: [
            dispatchGetPlans(),
            fetchCountriesAction(),
            dispatchFetchCurrentPrice(),
            dispatchGetBalance(walletAddress),
            dispatchGetIpAddress(deviceToken),
            fetchMySubscriptions(walletAddress),
            SET_USER_DETAILS_FETCHED(true),
          ],
        })
      );
    }
  }, [dispatch, walletAddress, deviceToken, isUserDetailsFetched]);

  if (walletAddress && deviceToken) {
    return (
      <div className={styles.root}>
        {showRenewSubscription && <RenewSubscriptionModal />}

        <div className={styles.content}>
          <Outlet />
        </div>
        <BottomTabs />
      </div>
    );
  }

  return <Navigate to={"/onboarding"} />;
};

export default AppLayout;
