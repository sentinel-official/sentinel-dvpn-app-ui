import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { withLoader } from "../actions/loader.action";
import { getWalletAddressAction } from "../actions/onboarding.action";
import styles from "./onboarding-layout.module.scss";
import { CHANGE_IS_REGISTERED } from "../redux/reducers/device.reducer";

const OnboardingLayout = () => {
  const dispatch = useDispatch();
  const { isWalletCreated, isRegistered } = useSelector(
    (state) => state.device
  );

  React.useEffect(() => {
    if (isWalletCreated && !isRegistered) {
      dispatch(
        withLoader([getWalletAddressAction(), CHANGE_IS_REGISTERED(true)])
      );
    }
  }, [isRegistered, isWalletCreated, dispatch]);

  if (isRegistered && isWalletCreated) {
    return <Navigate to="/app" />;
  }

  return (
    <div className={styles.root}>
      <ScrollRestoration
        getKey={(location) => {
          return location.key;
        }}
      />
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
