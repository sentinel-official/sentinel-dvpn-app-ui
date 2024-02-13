import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import BottomTabs from "../components/BottomTabs";
import styles from "./app-layout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../actions/loader.action";
import {
  dispatchCurrentPrice,
  dispatchGetAccountBalance,
  dispatchGetAppVersion,
  dispatchGetAvailablePlans,
  dispatchGetIPAddress,
  dispatchGetUserSubscriptions,
} from "../actions/home.actions";
import { dispatchGetVPNStatus } from "../actions/vpn.actions";
import { dispatchGetAvailableDNS } from "../actions/settings.action";
import { CHANGE_IS_HOME_LOADED } from "../redux/reducers/home.reducer";
import { getDeviceTokenAction, getWalletAddressAction } from "../actions/onboarding.action";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );

  const { isHomeLoaded } = useSelector((state) => state.home);

  React.useEffect(() => {
    if (!isHomeLoaded) {
      dispatch(
        withLoader([
          dispatchGetVPNStatus(),
          getDeviceTokenAction(),
          getWalletAddressAction(),
          dispatchGetIPAddress(),
          dispatchGetAccountBalance(),
          dispatchCurrentPrice(),
          dispatchGetAvailablePlans(),
          dispatchGetUserSubscriptions(),
          dispatchGetAvailableDNS(),
          dispatchGetAppVersion(),
          CHANGE_IS_HOME_LOADED(),
        ])
      );
    }
  }, [dispatch, isHomeLoaded]);

  if (!(isRegistered && isWalletCreated)) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <section className={styles.outlet}>
        <Outlet />
      </section>
      <section className={styles.nav}>
        <BottomTabs />
      </section>
    </div>
  );
};

export default AppLayout;
