import React from "react";
import styles from "./no-balance.module.scss";
import { useUserSelector } from "@hooks/use-selector";
import Icon from "@svgs/balance-icon.svg";
import { BTN_VARIANTS, Button, Image, Text } from "@components/index";
import useModal from "@hooks/use-modal";
import formatAmount from "@helpers/formatAmount";
import { useNavigate } from "react-router-dom";

const NoBalanceModal = () => {
  const { balance } = useUserSelector();
  const { hideModal } = useModal();
  const navigate = useNavigate();

  return (
    <div className={`${styles.root} px-16 py-28`}>
      <Text text={"no_balance_title"} className="fw-5 fs-22 mb-12" />
      <Text text={"no_balance_description"} className="fw-4 fs-14 text-8a94a3" />
      <section className={`mb-36 mt-18 ${styles.balance}`}>
        <Image src={Icon} />
        <Text text={`${formatAmount(balance / 1e6)} DVPN`} className="fw-5 fs-18" />
      </section>
      <Button
        className=" mb-8"
        onClick={() => {
          navigate("/user/wallet-details", { replace: true });
        }}
      >
        <Text text={"add_balance"} className="fw-5 fs-14 py-8" />
      </Button>
      <Button variant={BTN_VARIANTS.SECONDARY} onClick={hideModal}>
        <Text text={"cancel"} className="fw-5 fs-14 py-8" />
      </Button>
    </div>
  );
};

export default NoBalanceModal;
