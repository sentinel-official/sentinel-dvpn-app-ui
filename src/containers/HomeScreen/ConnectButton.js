import React from "react";
import Button, { variants } from "../../components/Button";
import QuickConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { withLoader } from "../../actions/loader.action";
import { connectAction, disconnectAction } from "../../actions/vpn.actions";
import styles from "./connect-button.module.scss";
import { useNavigate } from "react-router-dom";
import { CHANGE_MODAL_STATE } from "../../redux/reducers/alerts.reducer";
const ConnectButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const node = useSelector((state) => state.device.selectedNode);
  const isVPNConnected = useSelector((state) => state.device.isVPNConnected);
  const { balance, subscription } = useSelector((state) => state.home);

  const handleConnect = () => {
    if (!balance) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "no-balance" }));
      return;
    }
    if (!subscription || Object.values(subscription).length === 0) {
      dispatch(CHANGE_MODAL_STATE({ show: true, type: "renew-subscription" }));
      return;
    }
    dispatch(withLoader([connectAction(node)]));
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
        <Button
          title={"Switch Node"}
          variant={variants.PRIMARY}
          onClick={() => navigate("countries")}
          className={styles.btn}
        />
      </section>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={!(node && node.address)}
      icon={QuickConnectIcon}
      variant={variants.PRIMARY}
      title={"CONNECT"}
    />
  );
};

export default ConnectButton;
