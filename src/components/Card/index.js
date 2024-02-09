import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.scss";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const Card = ({ children, variant, className }) => {
  return (
    <div className={`${styles.root} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.oneOf(Object.values(variants)),
  className: PropTypes.any,
};

Card.defaultProps = {
  children: <></>,
  variant: variants.PRIMARY,
  className: null,
};

export default Card;
