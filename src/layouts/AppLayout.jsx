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
} from "../actions/user.actions";
import { withLoader } from "../actions/loader.actions";
import { fetchCountriesAction } from "../actions/nodes.actions";
import {
  SET_USER_DETAILS_FETCHED,
  SHOW_NO_BALANCE,
} from "../redux/alerts.reducer";
import BottomTabs from "../containers/BottomTabs";
import NoBalanceModal from "../components/NoBalanceModal";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { walletAddress, deviceToken } = useSelector((state) => state.device);
  const { showRenewSubscription, isUserDetailsFetched, isShowNoBalance } =
    useSelector((state) => state.alerts);
  const { balance } = useSelector((state) => state.account);

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
        {isShowNoBalance && (
          <NoBalanceModal
            balance={balance}
            onCancel={() => dispatch(SHOW_NO_BALANCE(false))}
          />
        )}

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
