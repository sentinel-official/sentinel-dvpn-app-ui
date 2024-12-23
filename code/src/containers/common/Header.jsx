import { BTN_VARIANTS, Button, Text } from "@components/index";
import { useLoaderSelector } from "@hooks/use-selector";
import React from "react";
import {  useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import BackIcon from "@svgs/back-icon.svg";
const Header = () => {
  const navigate = useNavigate();
  const { title, canGoBack } = useLoaderSelector();

  return (
    <section className={`${styles.root}`}>
      {canGoBack && (
        <Button
          variant={BTN_VARIANTS.TRANSPARENT}
          className={styles["go-back-btn"]}
          onClick={() => navigate(-1)}
        >
          <img src={BackIcon} alt="" />
        </Button>
      )}
      <Text className={`${styles.title} fs-16 fw-5`} text={title} />
    </section>
  );
};

export default Header;
