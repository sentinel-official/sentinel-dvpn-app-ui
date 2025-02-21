import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const ToggleSwitch = ({ checked = false, onClick = () => { }, className }) => {
  return (
    <section className={`${styles[`root${checked ? "-checked": ""}`]} ${className}`} onClick={onClick}>
      <section className={styles[`slider${checked ? "-checked": ""}`]} />
    </section>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default ToggleSwitch;
