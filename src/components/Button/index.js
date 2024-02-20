import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.scss";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TRANSPARENT: "transparent",
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
      onClick={disabled ? () => {} : onClick}
    >
      {icon && <img src={icon} alt="" />}
      {title && <span>{title}</span>}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(variants)).isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.any,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: variants.PRIMARY,
};

export default Button;
