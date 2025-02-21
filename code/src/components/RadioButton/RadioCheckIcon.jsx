import React from "react";
import styles from "./radio-icon.module.scss";
const RadioCheckIcon = ({ isChecked = false }) => {
  return (
    <svg className={styles.svg} fill="currentColor" preserveAspectRatio="xMidYMid meet" height="16px" width="16px" viewBox="0 0 34 34">
      <circle className={styles.radioOutline} cx="17" cy="17" r="15" fill="none" stroke="#dadada" strokeWidth="4" />
      {isChecked && <circle className={styles.radioDot} cx="17" cy="17" r="8" fill="#0156FC" />}
    </svg>
  );
};

export default RadioCheckIcon;
