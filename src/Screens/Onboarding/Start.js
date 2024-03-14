import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./start.module.scss";
import KeyIcon from "../../assets/icons/key-icon.svg";
import Button, { variants } from "../../components/Button";

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>Welcome to Sentinel</span>
        <span className={styles.description}>
          Join anonymously or sign up with your email address.
        </span>
      </section>
      <section className={styles.middle}>
        <img src={KeyIcon} alt="" />
        <span className={styles.title}>How it works?</span>
        <span className={styles.description}>
          Anonymous sign-up will allow you to create a Sentinel DVPN wallet
          without providing any information. This wallet can be loaded and used
          by you to purchase VPN services in the application.
        </span>
      </section>
      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={"Continue"}
          className={styles["continue-btn"]}
          onClick={() => {
            navigate("/create", { replace: true });
          }}
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>Already have an account?</span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/import", { replace: true });
            }}
          >
            Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Start;
