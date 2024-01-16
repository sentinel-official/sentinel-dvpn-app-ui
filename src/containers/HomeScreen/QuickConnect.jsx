import React from "react";
import QuiciConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { connectAction } from "../../actions/user.actions";

const QuickConnect = () => {
  const dispatch = useDispatch();
  const node = useSelector((state) => state.device.selectedNode);

  const connect = () => {
    dispatch(connectAction());
  };

  return (
    <>
      <Button
        title={"Quick Connect"}
        icon={QuiciConnectIcon}
        variant={variants.primary}
        onClick={connect}
        disabled={!(node && node.address)}
      />
    </>
  );
};

export default QuickConnect;
