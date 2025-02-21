import React from "react";
import styles from "./purchase-pending.module.scss";
import { Button, Image, Text } from "@components/index";
import useModal from "@hooks/use-modal";
import { useNavigate } from "react-router-dom";
import PurchaseIcon from "@svgs/purchase-icon.svg";
import { getMobileOS } from "@helpers/getOSType";

const PurchasePending = () => {
  const navigate = useNavigate();
  const { hideModal } = useModal();

  return (
    <div className={`${styles.root} p-14`}>
      <Image
        src={PurchaseIcon}
        className={styles.image}
      />
      <Text
        text={"dvpn_are_on_the_way"}
        className="fs-20 fw-5 mt-12 mb-18"
      />
      <Text
        text={"dvpn_are_on_the_way_desc"}
        className="fs-14 fw-4 text-9cabc9 mb-18"
        data={{ from: getMobileOS() === "ios" ? "iTunes" : "Google" }}
      />

      <Button
        className="mt-14"
        onClick={async () => {
          hideModal();
          setTimeout(() => {
            navigate("/user/wallet-details", { replace: true });
          }, 100);
          return;
        }}
      >
        <Text
          text={"ok"}
          className="fs-14 fw-4 py-12"
        />
      </Button>
    </div>
  );
};

export default PurchasePending;
