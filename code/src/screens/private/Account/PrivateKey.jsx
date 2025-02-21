import React from "react";
import styles from "./private-key.module.scss";
import { BTN_VARIANTS, Button, Text } from "@components/index";
import { useDispatch } from "react-redux";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import MnemonicArea from "@containers/common/MnemonicArea";
// import useModal from "@hooks/use-modal";
import { useAuthSelector } from "@hooks/use-selector";
import copy from "copy-to-clipboard";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import { CHANGE_ENCRYPTION_STATUS } from "@reducers/auth.reducer";

const PrivateKey = () => {
  // const { showModal } = useModal();
  const showAlert = useAlerts();
  const { mnemonic, isEncrypted } = useAuthSelector();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "private_key",
        canGoBack: true,
      })
    );
    dispatch(CHANGE_ENCRYPTION_STATUS({ isEncrypted: true }));
  }, []);
  // React.useEffect(() => {
  //   if (isEncrypted) {
  //     showModal({
  //       name: "manage-key",
  //       cancellable: false,
  //       data: { mnemonic },
  //     });
  //   }
  // }, []);

  return (
    <div className={`${styles.root} py-16`}>
      <Text text={"your_unique_private_key_title"} className="fs-22 fw-6 mb-16  ml-8" />
      <Text text={"your_unique_private_key_desc"} data={{ length: mnemonic.split(" ").length }} className="fs-14 fw-4 text-9cabc9 ml-8 mb-16" />
      <section className={styles["mnemonic-area"]}>
        <MnemonicArea inputValues={mnemonic.split(" ")} disabled={true} show={!isEncrypted} />
      </section>
      <Button
        onClick={async () => {
          dispatch(CHANGE_ENCRYPTION_STATUS({ isEncrypted: !isEncrypted }));
        }}
        variant={BTN_VARIANTS.SECONDARY}
        className="my-16"
      >
        <Text text={isEncrypted ? "show" : "hide"} className="py-12" />
      </Button>

      <Button
        onClick={async () => {
          await copy(mnemonic);
          showAlert({
            type: ALERT_TYPES.success,
            message: "success_key_coped",
          });
        }}
        disabled={isEncrypted}
      >
        <Text text={"copy_private_key"} className="py-12" />
      </Button>
    </div>
  );
};

export default PrivateKey;
