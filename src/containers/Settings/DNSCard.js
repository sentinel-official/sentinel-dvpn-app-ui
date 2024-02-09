import React from "react";
import styles from "./dns-card.module.scss";
import Card, { variants } from "../../components/Card";
import DNSIcon from "../../assets/icons/dns-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";

const DNSCard = () => {
  const dispatch = useDispatch();

  const current = useSelector((state) => state.dns.current);
  return (
    <div className={styles.root}>
      <span className={styles.title}>DVPN</span>
      <Card variant={variants.SECONDARY}>
        <button
          className={styles.dns}
          onClick={() => {
            dispatch(CHANGE_MODAL_STATE({ show: true, type: "dns" }));
          }}
        >
          <section>
            <img src={DNSIcon} alt="" />
            <span>DNS</span>
          </section>
          <span className={styles.value}>
            {capitalizeFirstLetter(current.name)}
          </span>
        </button>
      </Card>
    </div>
  );
};

export default DNSCard;