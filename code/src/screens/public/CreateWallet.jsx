import { Button, Text, BTN_VARIANTS } from "@components/index";
import styles from "./create-wallet.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLoader from "@hooks/use-loader";
import MnemonicArea from "@containers/common/MnemonicArea";
import copy from "copy-to-clipboard";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import useAuth from "@hooks/use-auth";
import authServices from "@services/auth.services";

const CreateWallet = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const { startLoader, stopLoader } = useLoader();
  const showAlert = useAlerts();
  const { login } = useAuth();
  React.useEffect(() => {
    const init = async () => {
      try {
        startLoader({ message: "loader_fetching_private_key" });
        const response = await authServices.getUniqueKey();
        setKeywords(response.keywords);
      } catch (e) {
        console.error(e);
        showAlert({
          type: ALERT_TYPES.error,
          message: "error_fetching_keywords",
        });
      } finally {
        stopLoader();
      }
    };
    init();
  }, []);

  React.useEffect(() => {
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, []);

  return (
    <div className={`${styles.root} px-24 py-48`} id="top">
      <Text
        text={"your_unique_private_key_title"}
        className="fs-22 fw-6 mb-16  ml-8"
      />
      <Text
        text={"your_unique_private_key_desc"}
        data={{ length: keywords.length }}
        className="fs-14 fw-4 text-9cabc9 ml-8 mb-16"
      />
      <section className={styles["mnemonic-area"]}>
        <MnemonicArea show={show} inputValues={keywords} disabled={true} />
      </section>

      <Button
        variant={`${show ? BTN_VARIANTS.SECONDARY : BTN_VARIANTS.PRIMARY}`}
        disabled={keywords.length === 0}
        onClick={async () => {
          if (!show) {
            setShow(true);
            return;
          }
          await copy(keywords.join(" "));
          showAlert({
            type: ALERT_TYPES.success,
            message: "success_key_coped",
          });
          return;
        }}
        className="mb-18"
      >
        <Text
          text={`${show ? "copy_private_key" : "reveal_private_key"}`}
          className={"py-8"}
        />
      </Button>
      <Button
        variant={BTN_VARIANTS.PRIMARY}
        disabled={!show}
        onClick={() => login(keywords.join(" "))}
        className="mb-18"
      >
        <Text text={"create_wallet"} className={"py-8"} />
      </Button>
      <section className={styles.login}>
        <Text
          text={"already_have_a_wallet"}
          className={` text-9cabc9 fs-16 fw-4`}
        />
        <Text
          text={"connect"}
          className={`text-link fs-16 fw-4 ml-4`}
          onClick={() => navigate("/import")}
        />
      </section>
    </div>
  );
};

export default CreateWallet;
