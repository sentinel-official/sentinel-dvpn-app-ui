import React from "react";
import styles from "./styles/launching-screen.module.scss";
import Logo from "../assets/images/launching-screen-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import APIService from "../services/app.services";
import { SET_USER_DETAILS } from "../redux/user.reducer";

const LaunchingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const { walletAddress, deviceToken } = useSelector((state) => state.user);

  React.useEffect(() => {
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
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  React.useEffect(() => {
    if (!isLoading) {
      if (walletAddress && deviceToken) {
        navigate("/app");
      } else {
        navigate("/onboarding");
      }
    }
  }, [isLoading, walletAddress, deviceToken, navigate]);
  
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
