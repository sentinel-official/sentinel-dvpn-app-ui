import React from "react";
import copyToClipboard from "copy-to-clipboard";
import styles from "./private-key.module.scss";
import Button, { variants } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";

const PrivateKey = () => {
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.device.mnemonic);

  const handleRevealCopy = () => {
    copyToClipboard(mnemonic);
    dispatch(
      CHANGE_SUCCESS_ALERT({ show: true, message: "Copied Successfully" })
    );
    return;
  };

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>Your unique private key</span>
        <span className={styles.description}>
          Copy down this unique 24 word key somewhere safe. This key will be
          needed to access your wallet incase you get logged out or need to use
          your wallet outside this application.
        </span>
      </section>
      <section className={styles.middle}>
        {mnemonic.split(" ").map((v, index) => (
          <span key={`${v}-${index}`} className={`${styles["mnemonic-value"]}`}>
            {v}
          </span>
        ))}
      </section>

      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={"Copy private key"}
          className={styles["primary-btn"]}
          onClick={handleRevealCopy}
        />
      </section>
    </div>
  );
};

export default PrivateKey;
