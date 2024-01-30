import React from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import ReactCountryFlag from "react-country-flag";

const SelectedNode = () => {
  const node = useSelector((state) => state.device.selectedNode);

  if (node && node.address) {
    return (
      <div className={styles["selected-node"]}>
        <ReactCountryFlag
          style={{
            width: "24px",
            height: "100%",
          }}
          countryCode={node?.countryCode?.toUpperCase()}
          svg
        />
        <span>
          {node.city}, {node.countryCode}
        </span>
      </div>
    );
  }
  return <span className={styles.muted}>Server is not selected</span>;
};

export default SelectedNode;
