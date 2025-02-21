import React from "react";
import styles from "./radio-icon.module.scss";
import { Text } from "..";
import RadioCheckIcon from "./RadioCheckIcon";

const RadioButton = ({ value, isChecked = false, onChange = () => {}, className = "", textClassName = "", children = null }) => {
  return (
    <label className={`${styles.radioBtn} mb-24 ${className} `} htmlFor={`radio-value-${value}`}>
      <input name={value} value={value} type="radio" checked={isChecked} onChange={onChange} id={`radio-value-${value}`} />
      <RadioCheckIcon isChecked={isChecked} />
      {children ? children : <Text text={value} className={`fs-14 fw-5  ${textClassName}`} />}
    </label>
  );
};

export default RadioButton;
