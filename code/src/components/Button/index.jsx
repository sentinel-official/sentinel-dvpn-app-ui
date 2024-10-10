import React from "react";
import styles from "./button.module.scss";

export const BTN_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  QUATERNARY: "quaternary",
  OUTLINED: "outlined",
  TRANSPARENT: "transparent",
};

const Button = ({ children, onClick, disabled = false, className = "", variant = BTN_VARIANTS.PRIMARY, ...rest }) => {
  return (
    <button
      aria-label={Math.random().toString(36)}
      disabled={disabled}
      className={`${styles.root} ${styles[variant]} ${disabled ? styles.disabled : ""} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
