import React from "react";
import styles from "./card.module.scss";

export const CARD_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TRANSPARENT: "transparent",
};

const Card = ({
  children = <></>,
  variant = CARD_VARIANTS.PRIMARY,
  className = "",
  ...rest
}) => {
  return (
    <div className={`${styles.root} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
