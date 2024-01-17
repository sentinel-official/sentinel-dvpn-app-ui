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

const QuickConnect = () => {
  const dispatch = useDispatch();
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
      <Button
        title={isVPNConnected ? "Disconnect" : "Quick Connect"}
        icon={QuiciConnectIcon}
        variant={isVPNConnected ? variants.secondary : variants.primary}
        onClick={isVPNConnected ? disconnect : connect}
        disabled={!(node && node.address)}
      />
    </>
  );
};

export default QuickConnect;
