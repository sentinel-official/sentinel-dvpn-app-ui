import React from "react";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import copyToClipboard from "copy-to-clipboard";
import styles from "./create.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_SUCCESS_ALERT } from "../../redux/reducers/alerts.reducer";
import { withLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";

const mnemonic = generateMnemonic(wordlist, 256);

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [revealed, setRevealed] = React.useState(false);

  const handleRevealCopy = () => {
    if (revealed) {
      copyToClipboard(mnemonic);
      dispatch(
        CHANGE_SUCCESS_ALERT({ show: true, message: "Copied Successfully" })
      );

      return;
    }
    setRevealed(true);
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
          <span
            key={`${v}-${index}`}
            className={`${styles["mnemonic-value"]} ${
              revealed ? "" : styles.blur
            }`}
          >
            {v}
          </span>
        ))}
      </section>

      <section className={styles.bottom}>
        <Button
          variant={`${revealed ? variants.SECONDARY : variants.PRIMARY}`}
          title={`${revealed ? "Copy private key" : "Reveal private key"}`}
          className={styles["primary-btn"]}
          onClick={handleRevealCopy}
        />
        <Button
          disabled={!revealed}
          variant={`${revealed ? variants.PRIMARY : variants.DISABLED}`}
          title={"Create account"}
          className={styles["secondary-btn"]}
          onClick={() =>
            dispatch(withLoader([createWalletWithMnemonic(mnemonic)]))
          }
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>Already have an account?</span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/onboarding/import");
            }}
          >
            Login
          </button>
        </section>
      </section>
    </div>
  );
};

export default Create;
