import React from "react";
import { useSelector } from "react-redux";
import styles from "./page-title.module.scss";
import Card from "../../components/Card";
import Button from "../../components/Button";
import BackIcon from "../../assets/icons/back-icon.svg";
import { useNavigate } from "react-router-dom";

const PageTitle = () => {
  const navigate = useNavigate();
  const { pageTitle, canGoBack } = useSelector((state) => state.nodes);
  return (
    <Card>
      <section className={styles.root}>
        {canGoBack && (
          <Button
            icon={BackIcon}
            className={styles["go-back-btn"]}
            onClick={() => navigate(-1)}
          />
        )}
        <span className={styles.title}>{pageTitle}</span>
      </section>
    </Card>
  );
};

export default PageTitle;
