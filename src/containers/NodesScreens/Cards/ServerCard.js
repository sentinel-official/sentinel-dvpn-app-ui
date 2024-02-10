import React from "react";
import styles from "./server-card.module.scss";
import Card, { variants } from "../../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { withSingleDispatcherLoader } from "../../../actions/loader.action";
import { connectAction } from "../../../actions/vpn.actions";
import { useNavigate } from "react-router-dom";
import { CHANGE_MODAL_STATE } from "../../../redux/reducers/alerts.reducer";

const ServerCard = ({ server }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { balance, subscription } = useSelector((state) => state.home);

  const connect = async (node) => {
    try {
      if (!balance) {
        dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
        return;
      }

      if (!subscription || Object.values(subscription).length === 0) {
        dispatch(
          CHANGE_MODAL_STATE({ show: true, type: "renew-subscription" })
        );
        return;
      }
      const { payload } = await dispatch(
        withSingleDispatcherLoader(connectAction(node))
      );
      if (payload && payload.isConnected) {
        navigate("/");
      }
    } catch (e) {}
  };

  return (
    <Card variant={variants.SECONDARY}>
      <button
        className={styles.root}
        onClick={(event) => {
          event.preventDefault();
          connect(server);
        }}
      >
        <section className={styles.details}>
          <span className={styles.name}>{server.name}</span>
          <span className={styles.value}>{server.address}</span>
        </section>
      </button>
    </Card>
  );
};

export default ServerCard;
