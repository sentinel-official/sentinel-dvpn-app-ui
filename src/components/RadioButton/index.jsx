import React from "react";
import styles from "./radio-icon.module.scss";

const RadioButton = ({ value, isChecked, onChange }) => {
  return (
    <label className={styles.radioBtn} htmlFor={`dns-value-${value}`}>
      <input
        name={value}
        value={value}
        type="radio"
        checked={isChecked}
        onChange={onChange}
        id={`dns-value-${value}`}
      />
      <svg
        className={styles.svg}
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        height="18px"
        width="18px"
        viewBox="0 0 34 34"
      >
        <circle
          className={styles.radioOutline}
          cx="17"
          cy="17"
          r="15"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <circle
          className={styles.radioDot}
          cx="17"
          cy="17"
          r="8"
          fill="#0156FC"
        />
      </svg>
      <span>{value}</span>
    </label>
  );
};

export default RadioButton;
