import React from "react";
import styles from "./toggle-enable.module.scss";
import Card from "@components/Card";
import { Text, ToggleSwitch } from "@components/index";
import {  useTunnelSelector } from "@hooks/use-selector";
import { useDispatch } from "react-redux";
import { dispatchSetToggleTunnelEnableStatus } from "@actions/tunnel.actions";

const ToggleEnable = () => {
  const dispatch = useDispatch();
  const { isEnabled } = useTunnelSelector();
  return (
    <Card className={`${styles.root} my-4 px-14`}>
      <Text text={"split_tunnelling"} className={`fs-14`} />
      <ToggleSwitch
        checked={isEnabled}
        onClick={() => dispatch(dispatchSetToggleTunnelEnableStatus())}
      />
    </Card>
  );
};

export default ToggleEnable;
