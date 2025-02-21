import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./wallet-details.module.scss";
import BalanceCard from "@containers/Account/BalanceCard";
import QRCodeCard from "@containers/Account/QRCodeCard";
import { BTN_VARIANTS, Button, Text } from "@components/index";
import { getMobileOS } from "@helpers/getOSType";
import useOpenWindow from "@hooks/use-open-window";
import { links } from "@root/constants";
import { useAuthSelector } from "@hooks/use-selector";
import copy from "copy-to-clipboard";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import useModal from "@hooks/use-modal";

const WalletDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlerts();
  const { openWindow } = useOpenWindow();
  const { mnemonic } = useAuthSelector();
  const { showModal, MODAL_VARIANTS } = useModal();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "wallet_details",
        canGoBack: true,
      })
    );
  }, []);
  return (
    <div className={styles.root}>
      <BalanceCard />
      <QRCodeCard />
      <Button
        className="my-24"
        onClick={async () => {
          await copy(mnemonic);
          showAlert({
            type: ALERT_TYPES.success,
            message: "success_key_coped",
          });
          // navigate("/user/private-key")
        }}
      >
        <Text
          text="show_mnemonic"
          className="py-14"
        />
      </Button>
      <Button
        variant={BTN_VARIANTS.SECONDARY}
        className="my-24"
        onClick={() => navigate("/user/add-balance", { replace: true })}
      >
        <Text
          text="add_balance"
          className="py-14"
        />
      </Button>

      {getMobileOS() !== "ios" && (
        <>
          <Button
            variant={BTN_VARIANTS.SECONDARY}
            onClick={() => openWindow({ url: links.SWAP_DVPN })}
          >
            <Text
              text="swap_to_get_dvpn"
              className="py-14"
            />
          </Button>
          <section className={`${styles["how-to-deposit"]} mt-24`}>
            <Text
              text={"how_to_deposit_title"}
              className="fs-20 fw-6 mb-16  ml-8"
            />
            <Text
              text={"how_to_deposit_desc"}
              className="fs-14 fw-4 text-9cabc9 ml-8 mb-16"
            />
          </section>
        </>
      )}
      <Button
        variant={BTN_VARIANTS.SECONDARY}
        className="my-24"
        onClick={() => showModal({ name: "delete-account", cancellable: true, variant: MODAL_VARIANTS.primary })}
      >
        <Text
          text="delete_account"
          className="py-14 text-ff0000"
        />
      </Button>
    </div>
  );
};

export default WalletDetails;
