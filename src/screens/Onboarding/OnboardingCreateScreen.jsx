import React from "react";
import copy from "copy-to-clipboard";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { useDispatch } from "react-redux";

import Button, { variants } from "../../components/Button";
import { SET_SHOW_SUCCESS_ALERT } from "../../redux/alerts.reducer";
import styles from "../styles/onboarding-screen.module.scss";
import APIService from "../../services/app.services";
import { useNavigate } from "react-router-dom";

const mnemonic = generateMnemonic(wordlist, 256);

const OnboardingCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [revealed, setRevealed] = React.useState(false);

  const createWallet = () => {
    const payload = {
      mnemonic,
    };
    APIService.setWallet(payload)
      .then(() => {
        navigate("/");
      })
      .catch(console.error);
  };

  const handleRevealed = (event) => {
    event.preventDefault();
    if (revealed) {
      copy(mnemonic);
      dispatch(
        SET_SHOW_SUCCESS_ALERT({
          showSuccessAlert: true,
          message: "Mnemonic copied successfully!",
        })
      );
      return;
    }
    setRevealed(true);
  };

  return (
    <div className={styles.create}>
      <div className={styles.top}>
        <span className={styles.title}>Your unique mnemonic</span>
        <span className={styles.subtitle}>
          Copy down this unique 24 word key somewhere safe. This key will be
          needed to access your wallet in case you get logged out or need to use
          your wallet outside this application.
        </span>
      </div>
      <div className={styles.bottom}>
        <div
          className={`${styles.mnemonics} ${revealed ? "" : styles.revealed}`}
        >
          {mnemonic.split(" ").map((word, index) => {
            return (
              <span
                key={`mnemonic-${index}-${word}`}
                className={styles.mnemonic}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.actions}>
        {revealed ? (
          <Button
            variant={variants.secondary}
            onClick={handleRevealed}
            title={"Copy Mnemonic"}
          />
        ) : (
          <Button
            variant={variants.primary}
            onClick={handleRevealed}
            title={"Reveal Mnemonic"}
          />
        )}

        <Button
          variant={`${revealed ? variants.primary : variants.secondary}`}
          onClick={createWallet}
          title={"Continue"}
          disabled={!revealed}
        />
      </div>
    </div>
  );
};

export default OnboardingCreateScreen;
