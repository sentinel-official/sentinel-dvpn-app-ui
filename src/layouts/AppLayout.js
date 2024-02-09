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

const AppLayout = () => {
  const dispatch = useDispatch();
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );

  React.useEffect(() => {
    dispatch(
      withLoader([
        dispatchGetVPNStatus(),
        dispatchGetIPAddress(),
        dispatchGetAccountBalance(),
        dispatchCurrentPrice(),
        dispatchGetAvailablePlans(),
        dispatchGetUserSubscriptions(),
        dispatchGetAvailableDNS(),
        dispatchGetAppVersion(),
      ])
    );
  }, [dispatch]);

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
