import React from "react";
import Button, { variants } from "../../components/Button";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../../actions/loader.action";
import { connectAction, disconnectAction } from "../../actions/vpn.actions";
import styles from "./connect-button.module.scss";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_MODAL_STATE,
} from "../../redux/reducers/alerts.reducer";
import {
  getCitiesByCountry,
  getRandomNode,
  getServersByCityAndCountryId,
} from "../../helpers/filterServers";
import {
  dispatchGetAvailableCities,
  dispatchGetAvailableNodes,
} from "../../actions/nodes.action";
import { MODAL_VARIANTS } from "../Modal/modal-types";
const ConnectButton = () => {
  const dispatch = useDispatch();
  const node = useSelector((state) => state.device.selectedNode);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);
  const { balance, subscription, plan } = useSelector((state) => state.home);
  const countries = useSelector((state) => state.nodes.countries);
  const cities = useSelector((state) => state.nodes.cities.all);
  const nodes = useSelector((state) => state.nodes.servers.all);
  const getServers = async () => {
    try {
      if (countries && countries.length > 0) {
        let currentCountry;
        let currentCity;

        currentCountry = getRandomNode(countries);

        const localCities = getCitiesByCountry(currentCountry, cities);

        if (localCities && localCities.length > 0) {
          currentCity = getRandomNode(localCities);
        } else {
          const { payload } = await dispatch(
            dispatchGetAvailableCities(currentCountry)
          );
          currentCity = getRandomNode(payload.current);
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

  const handleConnect = async () => {
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
    if (node && node.address) {
      dispatch(withLoader([connectAction(node)]));
      return;
    }
    let list = await getServers();

    if (list && list.length > 0) {
      const node = getRandomNode(list);

      const dispatched = dispatch(connectAction(node));

      try {
        await dispatched;
      } catch (e) {
        console.length("CONSOLE FAILED TO CONNECT");
      }
    }
  };

  const handleDisconnect = () => {
    dispatch(withLoader([disconnectAction(node)]));
  };

  if (isVPNConnected) {
    return (
      <section className={styles.connected}>
        <Button
          variant={variants.SECONDARY}
          title={"Disconnect"}
          className={styles.btn}
          onClick={handleDisconnect}
        />
      </section>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={countries && countries.length === 0}
      icon={QuickConnectIcon}
      variant={variants.PRIMARY}
      title={"Quick Connect"}
    />
  );
};

export default ConnectButton;
