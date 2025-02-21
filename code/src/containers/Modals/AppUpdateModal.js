import React from "react";
import styles from "./app-update.module.scss";
import { Button, Text } from "@components/index";
import { useUserSelector } from "@hooks/use-selector";
import useOpenWindow from "@hooks/use-open-window";
import { links } from "@root/constants";
const AppUpdateModal = () => {
  const { openWindow } = useOpenWindow();
  const { version, latestVersion } = useUserSelector().app;
  return (
    <div className={`${styles.root} p-16`}>
      <Text text={"modal_update_available"} className="fs-20 fw-6 mb-24" />
      <section className={styles.top}>
        <Text text={"modal_your_app_version"} data={{ version }} className="fs-16 fw-4 mb-16 text-6b7a97" />
        <Text text={"modal_latest_app_version"} data={{ version: latestVersion }} className="fs-16 fw-4 mb-16" />
        <Text text={"modal_update_app_to_enjoy"} className="fs-14 fw-4" />
      </section>
      <Button className="my-36" onClick={() => openWindow({ url: links.APP_UPDATE_LINK })}>
        <Text text={"update_to_latest_version"} className="py-8" data={{ version: latestVersion }} />
      </Button>
    </div>
  );
};

export default AppUpdateModal;
