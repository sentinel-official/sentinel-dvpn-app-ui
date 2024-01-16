import React from "react";
import styles from "../styles/onboarding-screen.module.scss";
import Button, { variants } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withLoader } from "../../actions/loader.actions";
import { createWalletMnemonic } from "../../actions/device.actions";

const OnboardingImportScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mnemonic, setMnemonic] = React.useState("");

  const setupWallet = () => {
    dispatch(withLoader({ dispatchers: [createWalletMnemonic(mnemonic)] }));
  };

  return (
    <div className={styles.import}>
      <div className={styles.top}>
        <span className={styles.title}>Log in with existing mnemonic</span>
        <span className={styles.subtitle}>
          Please provide your unique 24 word key to access your account.
        </span>
      </div>
      <div className={styles.bottom}>
        <textarea
          placeholder="Your mnemonic"
          value={mnemonic}
          onChange={(event) => setMnemonic(event.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <Button
          variant={variants.primary}
          onClick={setupWallet}
          title={"Log In"}
          disabled={mnemonic?.length === 0}
        />
        <Button
          variant={variants.secondary}
          onClick={(event) => {
            event.preventDefault();
            navigate("/onboarding/create");
          }}
          title={"I don't have an account"}
        />
      </div>
    </div>
  );
};

export default OnboardingImportScreen;
