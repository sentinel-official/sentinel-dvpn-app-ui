import React from "react";
import InfoIcon from "../../assets/icons/info-icon.svg";
import styles from "./protected.module.scss";
const Protected = () => {
  return (
    <div className={styles.protected}>
      <img src={InfoIcon} alt="" />
      <span>You&#39;re not protected</span>
    </div>
  );
};

export default Protected;
