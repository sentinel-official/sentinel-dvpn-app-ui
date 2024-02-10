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
import { CHANGE_MODAL_STATE } from "../../../redux/reducers/alerts.reducer";
import { withSingleDispatcherLoader } from "../../../actions/loader.action";
import { connectAction } from "../../../actions/vpn.actions";

const CityQuickConnect = ({ city }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.servers.all);
  const { balance, subscription } = useSelector((state) => state.home);
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
    if (!balance) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
      return;
    }
    if (!subscription || Object.values(subscription).length === 0) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "renew-subscription" }));
      return;
    }
    const node = getRandomNode(servers);
    const { payload } = await dispatch(
      withSingleDispatcherLoader(connectAction(node))
    );

    if (payload && payload.isConnected) {
      navigate("/");
    }
  };

  return (
    <Button
      disabled={!(servers && servers.length > 0)}
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
