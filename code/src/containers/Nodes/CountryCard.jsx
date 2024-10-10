import { Card, CARD_VARIANTS, Image, Text } from "@components/index";
import React from "react";
import styles from "./country-card.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MAKE_CURRENT_CITIES_EMPTY } from "@reducers/nodes.reducer";
import QuickConnect from "./QuickConnect";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card
      variant={CARD_VARIANTS.SECONDARY}
      className={`${styles.root} px-14 my-8`}
    >
      <section
        className={styles.left}
        onClick={async () => {
          await dispatch(MAKE_CURRENT_CITIES_EMPTY());
          navigate(`${country.id}/cities`);
        }}
      >
        <section className={styles["left-left"]}>
          <Image
            src={`https://flagcdn.com/${String(country.code).toLowerCase()}.svg`}
            alt=""
            width="32"
            style={{ display: "block" }}
          />
        </section>
        <section className={`${styles["left-right"]} ml-12`}>
          <Text
            text={country.name}
            className={`${styles.title} fs-16 fw-6`}
          />
          <Text
            text={country.count > 1 ? "count_of_nodes" : "one_node"}
            data={{ count: country.count }}
            className={`${styles.count} fs-12 fw-4 text-9cabc9`}
          />
        </section>
      </section>
      <section className={styles.right}>
        <QuickConnect country={country} />
      </section>
    </Card>
  );
};

export default CountryCard;
