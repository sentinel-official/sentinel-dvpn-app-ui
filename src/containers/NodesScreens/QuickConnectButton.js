import React from "react";
import Button from "../../components/Button";
import { variants } from "../../components/Card";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import styles from "./quick-connect-button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { connectAction } from "../../actions/vpn.actions";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRandomNode,
  getServersByCityAndCountryId,
  getServersByCountryId,
} from "../../helpers/filterServers";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
const QuickConnectButton = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [servers, setServers] = React.useState([]);
  const { balance, subscription } = useSelector((state) => state.home);
  const nodes = useSelector((state) => state.nodes.servers.all);

  React.useEffect(() => {
    if (params.countryId && params.cityId) {
      const servers = getServersByCityAndCountryId(
        params.cityId,
        params.countryId,
        nodes
      );
      setServers(servers);
      return;
    }
    if (params.countryId) {
      const servers = getServersByCountryId(params.countryId, nodes);
      setServers(servers);
      return;
    }
    setServers(nodes);
    return;
  }, [nodes, params.cityId, params.countryId]);

  const connect = async () => {
    try {
      if (!balance) {
        dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
        return;
      }
      if (Object.values(subscription).length === 0) {
        dispatch(
          CHANGE_MODAL_STATE({ show: true, type: "renew-subscription" })
        );
        return;
      }
      const node = getRandomNode(servers);
      const { payload } = await dispatch(
        withSingleDispatcherLoader(connectAction(node))
      );

      if (payload && payload.isConnected) {
        navigate("/");
      }
    } catch (e) {}
  };

  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        connect();
      }}
      disabled={!(servers && servers.length > 0)}
      variant={variants.PRIMARY}
      className={styles.root}
      icon={QuickConnectIcon}
    />
  );
};

export default QuickConnectButton;
