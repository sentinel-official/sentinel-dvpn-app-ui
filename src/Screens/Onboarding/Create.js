import React from "react";
import copyToClipboard from "copy-to-clipboard";
import styles from "./create.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CHANGE_ERROR_ALERT,
  CHANGE_LOADER_STATE,
  CHANGE_SUCCESS_ALERT,
} from "../../redux/reducers/alerts.reducer";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";
import blockchainServices from "../../services/blockchain.services";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [revealed, setRevealed] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState([]);

  React.useLayoutEffect(() => {
    const fetchMnemonic = async () => {
      try {
        dispatch(
          CHANGE_LOADER_STATE({
            show: true,
            message: "Fetching Private Key...",
          })
        );
        const response = await blockchainServices.getPrivateKey();
        setMnemonic(response.keywords);
        dispatch(
          CHANGE_LOADER_STATE({
            show: false,
            message: "",
          })
        );
      } catch (e) {
        dispatch(
          CHANGE_LOADER_STATE({
            show: false,
            message: "",
          })
        );
        dispatch(
          CHANGE_ERROR_ALERT({
            show: true,
            message: "Failed to get Private Key",
          })
        );
      }
    };
    fetchMnemonic();
  }, [dispatch]);

  const handleRevealCopy = () => {
    if (revealed) {
      copyToClipboard(mnemonic.join(" "));
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
        {mnemonic.map((v, index) => (
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
          disabled={!(mnemonic && mnemonic.length > 0)}
        />
        <Button
          disabled={!revealed}
          variant={`${revealed ? variants.PRIMARY : variants.SECONDARY}`}
          title={"Create account"}
          className={styles["secondary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            const { payload } = await dispatch(
              withSingleDispatcherLoader(
                createWalletWithMnemonic(mnemonic.join(" "))
              )
            );
            if (
              payload &&
              payload.error &&
              payload.error.message &&
              payload.error.message === "Rejected"
            ) {
              return;
            }
            navigate("/", { replace: true });
          }}
        />
        <section className={styles.login}>
          <span className={styles["login-text"]}>Already have an account?</span>
          <button
            className={styles["login-btn"]}
            onClick={() => {
              navigate("/import");
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
