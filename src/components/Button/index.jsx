import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export const variants = {
  primary: "primary",
  secondary: "secondary",
  disabled: "disabled",
};

const Button = ({
  variant,
  title,
  onClick,
  disabled,
  icon,
  className = "",
}) => {
  return (
    <button
      className={`${styles[variant]} ${
        disabled ? styles.disabled : ""
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="" />}
      {title && <span>{title}</span>}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(variants)).isRequired,
};

export default Button;
