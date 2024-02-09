import React from "react";
import PropTypes from "prop-types";
import ReactCountryFlag from "react-country-flag";
import styles from "./country-card.module.scss";
import Card, { variants } from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED } from "../../../redux/reducers/nodes.reducer";

import Button from "../../../components/Button";
import QuickConnectIcon from "../../../assets/icons/quick-connect-icon.svg";
import {
  getRandomNode,
  getServersByCountry,
} from "../../../helpers/filterServers";
import { CHANGE_MODAL_STATE } from "../../../redux/reducers/alerts.reducer";
import { withSingleDispatcherLoader } from "../../../actions/loader.action";
import { connectAction } from "../../../actions/vpn.actions";

const CityQuickConnect = ({ country }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.servers.all);
  const { balance, subscription } = useSelector((state) => state.home);
  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    const servers = getServersByCountry(country, nodes);
    setServers(servers);
    return;
  }, [country, nodes]);

  const connect = async () => {
    if (!balance) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
      return;
    }
    if (Object.values(subscription).length === 0) {
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

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Card variant={variants.SECONDARY} className={styles.root}>
      <button
        className={styles.left}
        onClick={(event) => {
          event.preventDefault();
          dispatch(SET_SELECTED({ country }));
          navigate(`${country.id}/cities`);
        }}
      >
        <ReactCountryFlag
          style={{
            width: "24px",
            height: "100%",
          }}
          countryCode={country.code?.toUpperCase()}
          svg
        />
        <section className={styles.details}>
          <span className={styles.name}>{country.name}</span>
          <span className={styles.value}>
            {country.servers_available}{" "}
            {`${country.servers_available > 1 ? "Nodes" : "Node"}`}
          </span>
        </section>
      </button>
      <CityQuickConnect country={country} />
    </Card>
  );
};

CountryCard.propTypes = {
  country: PropTypes.object,
};

export default CountryCard;
