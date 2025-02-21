import { Text } from "@components";
import { useDeviceSelector } from "@hooks/use-selector";
import React from "react";
import styles from "./bottom-card.module.scss";
import { Image } from "@components/index";

const SelectedServer = () => {
  const { recentServers } = useDeviceSelector();
  if (recentServers && recentServers.length > 0) {
    const selected = recentServers[0];

    return (
      <div className={`${styles["selected-server"]} mb-8`}>
        <Image src={`https://flagcdn.com/${String(selected.countryCode).toLowerCase()}.svg`} alt="" width="28" />
        <Text text={`${selected.cityName}, ${selected.countryCode}`} className="ml-6 fs-18 fw-5" />
      </div>
    );
  }

  return (
    <div className={`${styles["selected-server"]} mb-8`}>
      <Text text="server_is_not_selected" className={`fs-18 fw-5 text-9cabc9`} />
    </div>
  );
};

export default SelectedServer;
