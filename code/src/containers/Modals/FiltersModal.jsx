import React from "react";
import styles from "./filters.module.scss";
import { BTN_VARIANTS, Button, RadioButton, Text } from "@components/index";
import { useDeviceSelector } from "@hooks/use-selector";
import useProtocols from "@hooks/use-filter";
import useModal from "@hooks/use-modal";

const protos = {
  All: "V2RAY,WIREGUARD",
  V2Ray: "V2RAY",
  Wireguard: "WIREGUARD",
};

const nodes = {
  All: "Data center,Residential",
  "Data center": "Data center",
  Residential: "Residential",
};

const FiltersModal = () => {
  const { changeProtocol } = useProtocols();
  const { protocols } = useDeviceSelector();
  const { hideModal } = useModal();
  const items = [
    {
      title: "protocols",
      options: protos,
      currentValue: protocols,
      onChange: changeProtocol,
    },
    // {
    //   title: "nodes",
    //   options: nodes,
    // },
  ];

  return (
    <div className={`${styles.root} p-18`}>
      {items.map((item, index) => {
        return (
          <section key={`filter-type-${index}`} className={`mb-28 ${styles.filters}`}>
            <Text text={item.title} className="fw-5 fs-18 mb-8" />
            <section className={styles.values}>
              {Object.entries(item.options).map(([key, value], i) => {
                const isChecked = value === item.currentValue;
                return <Text text={key} className={`fs-14 fw-4 px-16 py-6 ${i === 0 ? "" : "ml-12"} ${styles.option} ${isChecked ? styles.checked : ""} `} onClick={() => item.onChange(value)} key={`filter-${item.title}-option-${i}`} />;
              })}
            </section>
          </section>
        );
      })}
      <Button onClick={hideModal}>
        <Text text={"ok"} className={"py-8"} />
      </Button>
    </div>
  );
};

export default FiltersModal;
