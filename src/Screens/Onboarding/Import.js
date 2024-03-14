import React from "react";
import styles from "./import.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withSingleDispatcherLoader } from "../../actions/loader.action";
import { createWalletWithMnemonic } from "../../actions/onboarding.action";
const Import = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = React.useState("");
  const isValidMnemonic = mnemonic.trim().split(" ").length === 24;

  return (
    <div className={styles.root}>
      <section className={styles.top}>
        <span className={styles.title}>Log in with the key</span>
        <span className={styles.description}>
          Provide your unique 24 word key
        </span>
      </section>
      <section className={styles.middle}>
        <textarea
          placeholder="Your private key"
          value={mnemonic}
          onChange={(event) => setMnemonic(event.target.value)}
        />
      </section>

      <section className={styles.bottom}>
        <Button
          variant={variants.PRIMARY}
          title={"Log in"}
          disabled={!isValidMnemonic}
          className={styles["primary-btn"]}
          onClick={async (event) => {
            event.preventDefault();
            const { payload } = await dispatch(
              withSingleDispatcherLoader(createWalletWithMnemonic(mnemonic))
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
        <section className={styles.signup}>
          <span className={styles["signup-text"]}>
            Don&#39;t have an account?
          </span>
          <button
            className={styles["signup-btn"]}
            onClick={() => {
              navigate("/create");
            }}
          >
            Sign up
          </button>
        </section>
      </section>
    </div>
  );
};

export default Import;
