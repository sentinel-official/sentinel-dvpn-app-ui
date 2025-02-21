import React from "react";
import styles from "./city-card.module.scss";
import { useNavigate } from "react-router-dom";
import { Card, CARD_VARIANTS, Text } from "@components/index";
import { useDispatch } from "react-redux";
import { MAKE_CURRENT_SERVERS_EMPTY } from "@reducers/nodes.reducer";
import QuickConnect from "./QuickConnect";

const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Card
      variant={CARD_VARIANTS.SECONDARY}
      className={`${styles.root} p-12 my-8`}
    >
      <section
        className={styles.left}
        onClick={async () => {
          await dispatch(MAKE_CURRENT_SERVERS_EMPTY());
          navigate(`${city.id}/servers`);
        }}
      >
        <Text text={city.name} className={`${styles.title} fs-16 fw-6`} />
        <Text
          text={city.count > 1 ? "count_of_nodes" : "one_node"}
          data={{ count: city.count }}
          className={`${styles.count} fs-12 fw-4 text-9cabc9`}
        />
      </section>
      <section className={styles.right}>
        <QuickConnect city={city} />
      </section>
    </Card>
  );
};

export default CityCard;
