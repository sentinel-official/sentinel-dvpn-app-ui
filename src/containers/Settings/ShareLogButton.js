import React from "react";
import { useDispatch } from "react-redux";
import { dispatchGetLogs } from "../../actions/settings.action";
import styles from "./share-log-button.module.scss";
import Card, { variants } from "../../components/Card";
import ShareIcon from "../../assets/icons/share-icon.svg";
const ShareLogButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(dispatchGetLogs());
  };
  return (
    <div className={styles.root}>
      <span className={styles.title}>Support</span>
      <Card variant={variants.SECONDARY}>
        <button className={styles.button} onClick={handleClick}>
          <section>
            <img src={ShareIcon} alt="" />
            <span>Share Logs</span>
          </section>
        </button>
      </Card>
    </div>
  );
};

export default ShareLogButton;
