import React from "react";
import styles from "./styles.module.scss";
import InfoIcon from "../../assets/icons/info-icon.svg";
import { useSelector } from "react-redux";

const Protected = () => {
  const { isVPNConnected } = useSelector((state) => state.device);

  if (isVPNConnected) {
    return null;
  }

  return (
    <div className={styles.protected}>
      <img src={InfoIcon} alt="" />
      <span>You're not protected</span>
    </div>
  );
};

export default Protected;
