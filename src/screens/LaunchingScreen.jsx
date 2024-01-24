import React from "react";
import styles from "./styles/launching-screen.module.scss";
import Logo from "../assets/images/launching-screen-logo.png";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../actions/loader.actions";
import { fetchDeviceDetails } from "../actions/device.actions";

const LaunchingScreen = () => {
  const { walletAddress, deviceToken, isRegistered } = useSelector(
    (state) => state.device
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isRegistered) {
      dispatch(
        withLoader({
          dispatchers: [fetchDeviceDetails()],
          message: "Registering...",
        })
      );
    }
  }, [dispatch, isRegistered]);

  if (isRegistered && walletAddress && deviceToken) {
    return <Navigate to="/app" />;
  }

  if (!(isRegistered && walletAddress && deviceToken)) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className={styles.root}>
      <img src={Logo} alt="" />
      <span className={styles.title}>Welcome to Sentinel VPN</span>
      <span className={styles.subtitle}>
        Join Sentinel and enjoy the unlimited possibilities of a decentralized
        VPN
      </span>
    </div>
  );
};

export default React.memo(LaunchingScreen);
