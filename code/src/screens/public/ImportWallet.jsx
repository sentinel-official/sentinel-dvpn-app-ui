import React from "react";
import BackgroundImage from "@svgs/onboarding-lock.svg";
import styles from "./import-wallet.module.scss";
import { Button, Text, BTN_VARIANTS } from "@components/index";
import NoOfWords from "@containers/ImportWallet/NoOfWords";
import MnemonicArea from "@containers/common/MnemonicArea";
import { useNavigate } from "react-router-dom";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import Loader from "@components/Loader";
import useAuth from "@hooks/use-auth";
import userServices from "@services/user.services";

const initializeInputValues = (noOfWords) => {
  return Array(noOfWords).fill("");
};

const ImportWallet = () => {
  const showAlert = useAlerts();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [noOfWords, setNoOfWords] = React.useState(24);
  const [inputValues, setInputValues] = React.useState(
    initializeInputValues(noOfWords)
  );
  const [isPasswordMode, setIsPasswordMode] = React.useState(true);
  
  React.useEffect(() => {
    setInputValues(initializeInputValues(noOfWords));
  }, [noOfWords]);

  const isValidMnemonic =
    inputValues.length === noOfWords &&
    !inputValues.some(
      (item) => item === "" || item === null || item === undefined
    );

  const changeValues = (event, index) => {
    const { value } = event.target;
    const newValues = [...inputValues];

    const splitValues = value.split(" ");
    for (let i = 0; i < splitValues.length; i++) {
      if (index + i < inputValues.length) {
        newValues[index + i] = splitValues[i] || "";
      }
    }
    setInputValues(newValues);

    if (splitValues.length > 1 && splitValues.length <= noOfWords) {
      const nextInput = document.getElementById(
        `mnemonic-input-box-${index + splitValues.length - 1}`
      );

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePasteFromClipboard = async (event) => {
    event.preventDefault();
    try {
      const response = await userServices.getClipboardData();

      const values = String(response.text)?.split(" ");
      if (values && values.length > 0) {
        let inputs = Array(noOfWords).fill("");
        for (let i = 0; i < values.length; i++) {
          if (i < noOfWords) {
            inputs[i] = values[i];
          } else {
            break;
          }
        }
        setInputValues(inputs);
        return;
      }
      throw "error_nothing_to_paste";
    } catch (e) {
      showAlert({ type: ALERT_TYPES.error, message: "error_nothing_to_paste" });
    }
  };

  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${BackgroundImage})` }}
      className={`${styles.root} px-24 py-48`}
      id="top"
    >
      <Loader />
      <section className={`${styles.top} mt-84`}>
        <Text text={"log_in_with_your_key_title"} className={"fs-28 fw-6"} />
        <Text
          text={"log_in_with_your_key_desc"}
          data={{ noOfWords: 24 }}
          className={"fs-14 fw-4 text-9cabc9 mt-16"}
        />
      </section>
      <section className={`${styles.middle} mt-36`}>
        <fieldset className={styles.fieldset}>
          <legend align={"center"} className={styles.legend}>
            <NoOfWords
              noOfWords={noOfWords}
              changeNoOfWords={(value) => setNoOfWords(value)}
              isPasswordMode={isPasswordMode}
              onChangeIsPasswordMode={()=>setIsPasswordMode(prev=>!prev)}
            />
          </legend>
          <MnemonicArea isPasswordMode={isPasswordMode} inputValues={inputValues} changeValues={changeValues} />
        </fieldset>
      </section>
      <section className={`${styles.bottom} mt-48`}>
        <Button
          variant={BTN_VARIANTS.TRANSPARENT}
          className="mb-18"
          onClick={handlePasteFromClipboard}
        >
          <Text text={"paste_from_clipboard"} />
        </Button>
        <Button
          variant={BTN_VARIANTS.PRIMARY}
          disabled={!isValidMnemonic}
          onClick={async (event) => {
            event.preventDefault();
            login(inputValues.join(" "));
          }}
          className="mb-18"
        >
          <Text text={"connect_wallet"} className={"py-8"} />
        </Button>
        <Button
          variant={BTN_VARIANTS.SECONDARY}
          onClick={async (event) => {
            event.preventDefault();
            navigate("/create", { replace: true });
          }}
        >
          <Text text={"create_new_wallet"} className={"py-8"} />
        </Button>
      </section>
    </div>
  );
};

export default ImportWallet;
