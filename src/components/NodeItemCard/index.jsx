import React from "react";
import Card from "../Card";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { useDispatch } from "react-redux";
import SentinelNodeIcon from "../../assets/images/launching-screen-logo.png";

const NodeItemCard = ({
  navigateTo = "/",
  title = "asdd",
  description = "asdd",
  code,
  logo,
  dispatcher,
  onSelect = () => {},
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
          onSelect();
        }}
        className={`list-button ${styles["card-button"]}`}
      >
        {code && (
          <ReactCountryFlag
            style={{
              width: "24px",
              height: "100%",
            }}
            countryCode={code?.toUpperCase()}
            svg
          />
        )}
        <section className={styles.details}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </section>
      </button>
      <section className={styles["quick-connect"]}>
        {logo && <img src={SentinelNodeIcon} alt="" />}
      </section>
    </Card>
  );
};

export default NodeItemCard;
