import React from "react";
import QuiciConnectIcon from "../../assets/icons/quick-connect-icon.svg";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { connectAction } from "../../actions/user.actions";
import { SHOW_NO_BALANCE } from "../../redux/alerts.reducer";

const QuickConnect = () => {
  const dispatch = useDispatch();
  const node = useSelector((state) => state.device.selectedNode);
  const { balance } = useSelector((state) => state.account);

  const connect = () => {
    if (balance === 0) {
      dispatch(SHOW_NO_BALANCE(true));
      return;
    }
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
