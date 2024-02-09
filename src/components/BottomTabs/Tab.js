import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./bottom-tabs.module.scss";

const Tab = ({ icon, href, className, title, isActive }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`${styles.tab} ${isActive ? styles.active : ""} ${className}`}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
      disabled={isActive}
    >
      <img src={icon} alt="" />
      <span>{title}</span>
    </button>
  );
};

Tab.propTypes = {
  icon: PropTypes.any,
  href: PropTypes.string.isRequired,
  className: PropTypes.any,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

Tab.defaultProps = {
  icon: null,
  href: "/",
  className: "",
  title: "",
  isActive: false,
};

export default Tab;
