import React from "react";
import styles from "./styles/launching-screen.module.scss";
import Logo from "../assets/images/launching-screen-logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import APIService from "../services/app.services";
import { SET_LOADING, SET_USER_DETAILS } from "../redux/user.reducer";

const LaunchingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { walletAddress, deviceToken, isLoading } = useSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    if (isLoading) {
      Promise.all([APIService.getKey("deviceToken"), APIService.getWallet()])
        .then(([deviceToken, walletAddress]) => {
          dispatch(
            SET_USER_DETAILS({
              value: deviceToken.value,
              address: walletAddress.address,
            })
          );
        })
        .catch(() => {})
        .finally(() => dispatch(SET_LOADING(false)));
      return;
    }
  }, [walletAddress, deviceToken, navigate, isLoading, dispatch]);

  if (isLoading && [walletAddress, deviceToken].includes(null)) {
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
  }

  if (!isLoading && walletAddress && deviceToken) {
    return <Navigate to="/app" />;
  }

  return <Navigate to="/onboarding" />;
};

export default React.memo(LaunchingScreen);
