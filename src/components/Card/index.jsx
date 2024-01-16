import React from "react";
import styles from "./card.module.scss";

const Card = ({ children, className, variant = "primary" }) => {
  return (
    <div className={`${styles.root} ${className} ${styles[variant]}`}>
      {children}
    </div>
  );
};

export default Card;
