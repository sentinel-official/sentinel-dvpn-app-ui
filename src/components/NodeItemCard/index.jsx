import React from "react";
import Card from "../Card";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Button, { variants } from "../Button";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";

const NodeItemCard = ({
  navigateTo = "/",
  title,
  description,
  code,
  action,
  dispatcher,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card className={styles["card-details"]} variant="secondary">
      <button
        onClick={(event) => {
          event.preventDefault();
          dispatcher && dispatch(dispatcher);
          navigate(navigateTo);
        }}
        className={`list-button ${styles["card-button"]}`}
      >
        {code && (
          <ReactCountryFlag
            style={{
              width: "24px",
              height: "100%",
            }}
            countryCode={code.toUpperCase()}
            svg
          />
        )}
        <section className={styles.details}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </section>
      </button>
      <section className={styles["quick-connect"]}>
        {action && (
          <Button icon={QuickConnectIcon} variant={variants.primary} />
        )}
      </section>
    </Card>
  );
};

export default NodeItemCard;
