import React from "react";
import styles from "../../styles/launching-screen.module.scss";
import Logo from "../../assets/images/launching-screen-logo.png";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const LaunchingScreen = () => {
  const navigate = useNavigate();

  const { walletAddress, deviceToken } = useSelector((state) => state.device);

  React.useEffect(() => {
    if (walletAddress && deviceToken) {
      navigate("/app");
    } else {
      navigate("/onboarding");
    }
  }, [walletAddress, deviceToken, navigate]);

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
