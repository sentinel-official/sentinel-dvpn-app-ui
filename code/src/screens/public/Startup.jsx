import React from "react";
import styles from "./startup.module.scss";
import SentinelLogo from "@pngs/sentinel-logo.png";
import { Image, Text } from "@components/index";
import Slider from "@containers/Startup/Slider";
import { useNavigate } from "react-router-dom";
import { getMobileOS } from "@helpers/getOSType";
import BGimage from "@pngs/onboarding-bg.png";

const Startup = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const os = getMobileOS();
    if (os === "ios") {
      navigate("/import", { replace: true });
      return;
    }
  }, [navigate]);
  return (
    <div className={`${styles.root} px-24 py-48`} style={{ backgroundImage: `url(${BGimage})` }}>
      <section className={styles.top}>
        <Image src={SentinelLogo} className={styles.logo} />
        <Text text={"sentinel_shield_dvpn"} className={"fs-20 fw-6 my-16"} />
      </section>
      <Slider />
    </div>
  );
};

export default Startup;
