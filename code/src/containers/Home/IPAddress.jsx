import { Text } from "@components/index";
import { useVPNSelector } from "@hooks/use-selector";
import React from "react";
import styles from "./bottom-card.module.scss";

const IPAddress = () => {
  const { ipAddress } = useVPNSelector();
  return (
    <div className={styles["ip-address"]}>
      <Text text="your_ip" className={`fs-14 fw-6 text-9cabc9 mr-4 ${styles.title}`} />
      <Text text={`${ipAddress}`} className={`${styles.ip} fs-14 fw-5 text-ffffff`} />
    </div>
  );
};

export default IPAddress;
