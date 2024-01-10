import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles/onboarding-layout.module.scss";

const OnboardingLayout = () => {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
