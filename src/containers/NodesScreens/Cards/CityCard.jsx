import React from "react";
import Card, { variants } from "../../../components/Card";
import styles from "./city-card.module.scss";
import { useNavigate } from "react-router-dom";
import { SET_SELECTED } from "../../../redux/reducers/nodes.reducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/Button";
import QuickConnectIcon from "../../../assets/icons/quick-connect-icon.svg";
import {
  getRandomNode,
  getServersByCityAndCountryId,
} from "../../../helpers/filterServers";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../../redux/reducers/alerts.reducer";
import { connectAction } from "../../../actions/vpn.actions";
import { dispatchGetAvailableNodes } from "../../../actions/nodes.action";
import { MODAL_VARIANTS } from "../../Modal/modal-types";

const CityQuickConnect = ({ city }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.servers.all);
  const { balance, subscription, plan } = useSelector((state) => state.home);
  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    const servers = getServersByCityAndCountryId(
      city.id,
      city.country_id,
      nodes
    );
    setServers(servers);
    return;
  }, [city, nodes]);

  const connect = async () => {
    if (plan.amount === 0) {
      if (balance <= 150000) {
        dispatch(
          CHANGE_MODAL_STATE({
            show: true,
            type: "no-balance",
            variant: MODAL_VARIANTS.PRIMARY,
          })
        );
        return;
      }
    } else {
      if (balance <= plan.amount) {
        dispatch(
          CHANGE_MODAL_STATE({
            show: true,
            type: "no-balance",
            variant: MODAL_VARIANTS.PRIMARY,
          })
        );
        return;
      }
    }

    if (!subscription || Object.values(subscription).length === 0) {
      dispatch(
        CHANGE_MODAL_STATE({
          show: true,
          type: "renew-subscription",
          variant: MODAL_VARIANTS.PRIMARY,
        })
      );
      return;
    }
    let list = servers;

    if (!(servers && servers.length > 0)) {
      const nodes = await dispatch(dispatchGetAvailableNodes(city));
      list = nodes.payload.current;
    } else {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: `Failed fetch Cities of ${city.name}`,
        })
      );
    }
    const node = getRandomNode(list);
    const dispatched = dispatch(connectAction(node));

    try {
      const { payload } = await dispatched;
      if (payload) navigate("/");
    } catch (e) {
      console.length("CONSOLE FAILED TO CONNECT");
    }
  };

  return (
    <Button
      className={styles["quick-connect-btn"]}
      variant={variants.PRIMARY}
      icon={QuickConnectIcon}
      onClick={connect}
    />
  );
};

const CityCard = ({ city }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card variant={variants.SECONDARY} className={styles.root}>
      <button
        className={styles.left}
        onClick={(event) => {
          event.preventDefault();
          dispatch(SET_SELECTED({ city }));
          navigate(`${city.id}/servers`);
        }}
      >
        <section className={styles.details}>
          <span className={styles.name}>{city.name}</span>
          <span className={styles.value}>
            {city.servers_available}{" "}
            {`${city.servers_available > 1 ? "Nodes" : "Node"}`}
          </span>
        </section>
      </button>
      <CityQuickConnect city={city} />
    </Card>
  );
};

export default CityCard;
