import { BTN_VARIANTS, Button, Image } from "@components/index";
import useModal from "@hooks/use-modal";
import React from "react";
import FiltersIcon from "@svgs/filter-icon.svg";
import styles from "./styles.module.scss";
import { useDeviceSelector } from "@hooks/use-selector";

const Filters = () => {
  const { showModal } = useModal();
  const { protocols } = useDeviceSelector();

  return (
    <Button
      className={`${styles["filters-btn"]} mx-6`}
      onClick={() => {
        showModal({ name: "filters" });
      }}
      variant={
        protocols === "V2RAY,WIREGUARD"
          ? BTN_VARIANTS.SECONDARY
          : BTN_VARIANTS.PRIMARY
      }
    >
      <Image src={FiltersIcon} />
    </Button>
  );
};

export default Filters;
