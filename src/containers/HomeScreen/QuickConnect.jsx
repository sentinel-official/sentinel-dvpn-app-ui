import React from "react";
import QuiciConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { connectAction, disconnectAction } from "../../actions/vpn.actions";
import {
  SHOW_NO_BALANCE,
  SHOW_RENEW_SUBSCRIPTION,
} from "../../redux/alerts.reducer";
import { withLoader } from "../../actions/loader.actions";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const QuickConnect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const node = useSelector((state) => state.device.selectedNode);
  const { balance, subscription } = useSelector((state) => state.account);
  const { isVPNConnected } = useSelector((state) => state.device);

  const connect = () => {
    if (balance === 0) {
      dispatch(SHOW_NO_BALANCE(true));
      return;
    }
    if (subscription && Object.keys(subscription).length > 0) {
      dispatch(
        withLoader({ dispatchers: [connectAction({ node, subscription })] })
      );
      return;
    }
    dispatch(SHOW_RENEW_SUBSCRIPTION(true));
  };

  const disconnect = () => {
    dispatch(
      withLoader({
        dispatchers: [disconnectAction()],
        message: "Disconnecting",
      })
    );
  };

  return (
    <>
      {isVPNConnected ? (
        <section className={styles["quick-connect"]}>
          <Button
            title={"Disconnect"}
            variant={variants.secondary}
            onClick={disconnect}
          />
          <Button
            title={"Switch Node"}
            variant={variants.primary}
            onClick={() => navigate("countries")}
            disabled={!(node && node.address)}
          />
        </section>
      ) : (
        <Button
          title={"Quick Connect"}
          icon={QuiciConnectIcon}
          variant={variants.primary}
          onClick={connect}
          disabled={!(node && node.address)}
        />
      )}
    </>
  );
};

export default QuickConnect;
