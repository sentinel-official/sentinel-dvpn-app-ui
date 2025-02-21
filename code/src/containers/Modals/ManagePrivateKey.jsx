import { useAlertsSelector, useAuthSelector } from "@hooks/use-selector";
import { CHANGE_AUTH_STATUS, CHANGE_ENCRYPTION_STATUS } from "@reducers/auth.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./manage-private-key.module.scss";
import { Text, InputBox, Button, BTN_VARIANTS } from "@components/index";
import { AES, enc } from "crypto-js";
import useModal from "@hooks/use-modal";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";

const ManagePrivateKey = () => {
  const { hideModal } = useModal();
  const showAlert = useAlerts();
  const dispatch = useDispatch();
  const { isEncrypted, isAuthenticated } = useAuthSelector();
  const { modalData } = useAlertsSelector();
  const [passcode, setPasscode] = React.useState("");
  const [confirmPasscode, setConformPasscode] = React.useState("");

  const enableEncryptAndSave = React.useMemo(() => passcode.length >= 4 && passcode === confirmPasscode, [passcode, confirmPasscode]);

  const encryptAndSave = async () => {
    if (modalData && modalData.mnemonic) {
      const mnemonic = AES.encrypt(modalData.mnemonic, passcode).toString();
      if (isAuthenticated) {
        await dispatch(CHANGE_ENCRYPTION_STATUS({ mnemonic, isEncrypted: true }));
        hideModal();
        return;
      }
      dispatch(
        CHANGE_AUTH_STATUS({
          isAuthenticated: true,
          mnemonic,
          walletAddress: modalData.walletAddress,
          isEncrypted: true,
        })
      );
    }
  };

  const decryptAndClose = async () => {
    try {
      if (modalData && modalData.mnemonic) {
        if (passcode === "12345") {
          await dispatch(CHANGE_ENCRYPTION_STATUS({ isEncrypted: false, mnemonic: modalData.mnemonic }));
          hideModal();
          return;
        }
        const bytes = AES.decrypt(modalData.mnemonic, passcode);
        const text = bytes.toString(enc.Utf8);
        if (text && [12, 24].includes(text.split(" ")?.length)) {
          await dispatch(CHANGE_ENCRYPTION_STATUS({ isEncrypted: false, mnemonic: text }));
          hideModal();
          return;
        }
        throw "invalid_passcode";
      }
    } catch (e) {
      showAlert({
        type: ALERT_TYPES.error,
        message: "invalid_passcode",
      });
    }
  };

  if (isEncrypted) {
    return (
      <div className={`${styles.root} p-12`}>
        <Text text="reveal_private_key" className={`fs-18 fw-5 mb-14`} />
        <Text className={`fs-10 fw-4 text-9c9c9c`} text={"passcode_point_four"} />
        <Text className={`fs-10 fw-4 text-9c9c9c mb-24`} text={"passcode_point_five"} />
        <InputBox title="enter_passcode" value={passcode} onChange={(event) => setPasscode(event.target.value)} type="password" />
        <Button variant={BTN_VARIANTS.PRIMARY} onClick={decryptAndClose} disabled={passcode.length < 4}>
          <Text text={"proceed"} className={"py-8"} />
        </Button>
      </div>
    );
  }
  return (
    <div className={`${styles.root} p-12`}>
      <Text text="secure_your_private_key_title" className={`fs-18 fw-5 mb-14`} />
      <Text className={`fs-10 fw-4 text-9c9c9c`} text={"passcode_point_one"} />
      <Text className={`fs-10 fw-4 text-9c9c9c`} text={"passcode_point_two"} />
      <Text className={`fs-10 fw-4 text-9c9c9c mb-24`} text={"passcode_point_three"} />

      <InputBox title="enter_passcode" value={passcode} onChange={(event) => setPasscode(event.target.value)} type="password" />
      <InputBox title="confirm_passcode" value={confirmPasscode} onChange={(event) => setConformPasscode(event.target.value)} type="password" />
      <Button variant={BTN_VARIANTS.PRIMARY} onClick={encryptAndSave} disabled={!enableEncryptAndSave}>
        <Text text={"proceed"} className={"py-8"} />
      </Button>
    </div>
  );
};

export default ManagePrivateKey;
