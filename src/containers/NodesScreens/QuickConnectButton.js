import React from "react";
import Button from "../../components/Button";
import { variants } from "../../components/Card";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import styles from "./quick-connect-button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { connectAction } from "../../actions/vpn.actions";
import { useNavigate } from "react-router-dom";
import {
  getCitiesByCountry,
  getRandomNode,
  getServersByCityAndCountryId,
} from "../../helpers/filterServers";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../redux/reducers/alerts.reducer";
import {
  dispatchGetAvailableCities,
  dispatchGetAvailableNodes,
} from "../../actions/nodes.action";
import { MODAL_VARIANTS } from "../Modal/modal-types";
const QuickConnectButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { balance, subscription, plan } = useSelector((state) => state.home);
  const { country, city } = useSelector((state) => state.nodes.selected);
  const countries = useSelector((state) => state.nodes.countries);
  const cities = useSelector((state) => state.nodes.cities.all);
  const nodes = useSelector((state) => state.nodes.servers.all);

  const getServers = async () => {
    try {
      if (countries && countries.length > 0) {
        let currentCountry = country;
        let currentCity = city;
        if (!(currentCountry && currentCountry.name)) {
          currentCountry = getRandomNode(countries);
        }

        const localCities = getCitiesByCountry(currentCountry, cities);

        if (!(currentCity && currentCity.name)) {
          if (localCities && localCities.length > 0) {
            currentCity = getRandomNode(localCities);
          } else {
            const { payload } = await dispatch(
              dispatchGetAvailableCities(currentCountry)
            );
            currentCity = getRandomNode(payload.current);
          }
        }

        const servers = getServersByCityAndCountryId(
          currentCity.id,
          currentCountry.id,
          nodes
        );

        if (servers && servers.length > 0) {
          return servers;
        } else {
          const { payload } = await dispatch(
            dispatchGetAvailableNodes(currentCity)
          );

          return payload.current;
        }
      } else {
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: `No Countries available`,
          })
        );
        return [];
      }
    } catch (e) {
      dispatch(
        CHANGE_ERROR_ALERT({
          show: true,
          message: `Failed to fetch a server`,
        })
      );
      return [];
    }
  };

  const connect = async () => {
    if (balance <= plan.amount || balance <= 150000) {
      dispatch(
        CHANGE_MODAL_STATE({
          show: true,
          type: "no-balance",
          variant: MODAL_VARIANTS.PRIMARY,
        })
      );
      return;
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
    let list = await getServers();

    if (list && list.length > 0) {
      const node = getRandomNode(list);

      const dispatched = dispatch(connectAction(node));

      try {
        const { payload } = await dispatched;
        if (payload) navigate("/");
      } catch (e) {
        console.length("CONSOLE FAILED TO CONNECT");
      }
    }
  };

  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        connect();
      }}
      variant={variants.PRIMARY}
      className={styles.root}
      icon={QuickConnectIcon}
    />
  );
};

export default QuickConnectButton;
