import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/onboarding-screen.module.scss";
import KeyIcon from "../../assets/icons/onboarding-screen-key-icon.svg";
import Button, { variants } from "../../components/Button";

const OnboardingStartScreen = () => {
  const navigate = useNavigate();

  const navigateTo = (event, path) => {
    event.preventDefault();
    console.log("path", path);
    navigate(path);
  };

  return (
    <div className={styles.start}>
      <div className={styles.top}>
        <span className={styles.title}>Welcome to Sentinel</span>
        <span className={styles.subtitle}>
          Join anonymously using existing mnemonic or create a new one.
        </span>
      </div>
      <div className={styles.bottom}>
        <img src={KeyIcon} alt="" />
        <span className={styles.title}>How it works?</span>
        <span className={styles.subtitle}>
          Anonymous sign-up will allow you to create a Sentinel DVPN wallet
          without providing any information. This wallet can be loaded and used
          by you to purchase VPN services in the application.
        </span>
        <Button
          variant={variants.primary}
          onClick={(event) => navigateTo(event, "/onboarding/create")}
          title={"Create New Wallet"}
        />
        <Button
          variant={variants.secondary}
          onClick={(event) => navigateTo(event, "/onboarding/import")}
          title={"Use existing mnemonic"}
        />
      </div>
    </div>
  );
};

export default OnboardingStartScreen;
