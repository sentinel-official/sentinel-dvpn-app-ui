import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { withLoader } from "../actions/loader.action";
import { getWalletAddressAction } from "../actions/onboarding.action";
import styles from "./onboarding-layout.module.scss";
import { CHANGE_IS_REGISTERED } from "../redux/reducers/device.reducer";

const OnboardingLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
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

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location && location.pathname]);

  if (isRegistered && isWalletCreated) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
