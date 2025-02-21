import { BTN_VARIANTS, Button, Card, Image, Text } from "@components/index";
import React from "react";
import styles from "./recent-servers-card.module.scss";
import OfflineIcon from "@svgs/offline-icon.svg";
import OnlineIcon from "@svgs/online-icon.svg";
import TrashIcon from "@svgs/trash-icon.svg";
import { useDispatch } from "react-redux";
import { REMOVE_RECENT_SERVER } from "@reducers/device.reducer";
import { useNavigate } from "react-router-dom";
import { parseWalletAddress } from "@helpers/parse.data";
import useAlerts from "@hooks/use-alerts";
import { useUserSelector, useVPNSelector } from "@hooks/use-selector";
import useVPN from "@hooks/useVPN";
import useModal from "@hooks/use-modal";

const RecentServerCard = ({ server, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showAlert = useAlerts();
  const { isConnected, isConnecting } = useVPNSelector();
  const { connectVPN } = useVPN();
  const { subscription } = useUserSelector();
  const { showModal } = useModal();

  return (
    <Card className={`${styles.root} p-12 my-8`}>
      <section
        className={styles.left}
        onClick={async () => {
          if (isConnected || isConnecting) {
            showAlert({ message: "disconnect_before_switch" });
            return;
          }

          if (!(subscription && subscription.id)) {
            showModal({ name: "subscription" });
            return;
          }
          if (!server.isAvailable) {
            showAlert({ message: "server_is_offline" });
            return;
          }
          try {
            const response = await connectVPN(server);
            if (response && response.isConnected && response.node) {
              await navigate(-1, {
                replace: true,
              });
            }
          } catch (e) {}
        }}
      >
        <section className={`${styles["left-top"]} mb-6`}>
          <section className={styles["left-top-left"]}>
            <Image src={`https://flagcdn.com/${String(server.countryCode).toLowerCase()}.svg`} alt="" width="28" style={{ display: "block" }} />
            <Text text={`${server.cityName}, ${server.countryCode}`} className={`${styles.title} ml-6 fs-16 fw-5`} />
          </section>
          <section className={`${styles["left-top-right"]} ml-12`}>
            <section className={`${styles.status} ${server.isAvailable ? styles.online : styles.offline} px-4 py-2`}>
              <Image src={server.isAvailable ? OnlineIcon : OfflineIcon} />
              <Text text={`${server.isAvailable ? "online" : "offline"}`} className={`fs-10 fw-4 ml-4`} />
            </section>
          </section>
        </section>
        <Text text={`${server.name}`} className={`${styles.name} fs-14 fw-4 mb-6 text-e0e4ea`} />
        <Text text={`${parseWalletAddress(server.address)}`} className={`${styles.address} fs-12 fw-4 text-9cabc9 mb-6`} />
      </section>
      <section className="right">
        {index > 0 && (
          <Button variant={BTN_VARIANTS.TRANSPARENT} onClick={() => dispatch(REMOVE_RECENT_SERVER(server))}>
            <Image src={TrashIcon} />
          </Button>
        )}
      </section>
    </Card>
  );
};

export default RecentServerCard;
