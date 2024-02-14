import React from "react";
import Button, { variants } from "../../components/Button";
import { useDispatch } from "react-redux";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { dispatchGetLogs } from "../../actions/settings.action";
import styles from "./share-log-button.module.scss";
const ShareLogButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(withSingleDispatcherLoader(dispatchGetLogs()));
  };
  return (
    <Button
      className={styles.root}
      variant={variants.SECONDARY}
      title={"Share Logs"}
      onClick={handleClick}
    />
  );
};

export default ShareLogButton;
