import React from "react";
import styles from "./styles.module.scss";
import InfoIcon from "../../assets/icons/info-icon.svg";

const Protected = () => {
  return (
    <div className={styles.protected}>
      <img src={InfoIcon} alt="" />
      <span>You're not protected</span>
    </div>
  );
};

export default Protected;
