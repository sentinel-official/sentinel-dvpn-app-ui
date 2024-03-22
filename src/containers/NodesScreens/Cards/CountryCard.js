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
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../../redux/reducers/alerts.reducer";
import { connectAction } from "../../../actions/vpn.actions";
import {
  dispatchGetAvailableCities,
  dispatchGetAvailableNodes,
} from "../../../actions/nodes.action";
import { MODAL_VARIANTS } from "../../Modal/modal-types";

const CityQuickConnect = ({ country }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.servers.all);
  const { balance, subscription, plan } = useSelector((state) => state.home);
  const [servers, setServers] = React.useState([]);

  React.useEffect(() => {
    const servers = getServersByCountry(country, nodes);
    setServers(servers);
    return;
  }, [country, nodes]);

  const connect = async () => {
    if (plan.amount === 0) {
      if (balance <= 15000) {
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
      const { payload } = await dispatch(dispatchGetAvailableCities(country));
      const currentCities = payload.current;
      if (currentCities && currentCities.length > 0) {
        const randomCity = getRandomNode(currentCities);
        const nodes = await dispatch(dispatchGetAvailableNodes(randomCity));
        list = nodes.payload.current;
      } else {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: `Failed fetch Cities of ${country.name}`,
          })
        );
      }
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
            height: "24px",
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
