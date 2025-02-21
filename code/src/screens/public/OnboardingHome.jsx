import React from "react";
import styles from "./onboarding-home.module.scss";
import { Text } from "@components/index";
import HomeImage from "@svgs/onboarding-home.svg";
import { getMobileOS } from "@helpers/getOSType";
import { useNavigate } from "react-router-dom";

const OnboardingHome = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const os = getMobileOS();
      if (os === "ios") {
        navigate("/import", { replace: true });
      } else {
        navigate("/start", { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div className={styles.root}>
      <img className={styles["home-img"]} src={HomeImage} alt="" />
      <section className={styles.title}>
        <Text text={"welcome_home_welcome_to"} />
        <Text text={"welcome_sentinel_shield_dvpn"} />
      </section>
      <Text text={"welcome_home_description"} className={`text-9cabc9`} />
    </div>
  );
};

export default OnboardingHome;
