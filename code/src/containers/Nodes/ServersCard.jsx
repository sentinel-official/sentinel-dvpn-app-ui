import React from "react";
import styles from "./servers-card.module.scss";
import { Card, CARD_VARIANTS, Text } from "@components/index";
import { useNavigate } from "react-router-dom";
import { parseWalletAddress } from "@helpers/parse.data";
import { useUserSelector, useVPNSelector } from "@hooks/use-selector";
import useAlerts from "@hooks/use-alerts";
import proxyServices from "@services/proxy.services";
import useVPN from "@hooks/useVPN";
import useModal from "@hooks/use-modal";

const ServersCard = ({ server }) => {
  const navigate = useNavigate();
  const showAlert = useAlerts();
  const { isConnected, isConnecting } = useVPNSelector();
  const { connectVPN } = useVPN();
  const { subscription } = useUserSelector();
  const { showModal } = useModal();

  return (
    <Card variant={CARD_VARIANTS.SECONDARY} className={`${styles.root} p-12 my-8`}>
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
          try {
            const { data = [] } = await proxyServices.fetchServersStatus({
              addresses: [server.address],
            });
            if (data && data[0] && data[0]?.is_available) {
              const response = await connectVPN(server);
              if (response && response.isConnected && response.node) {
                await navigate(-3, { replace: true });
              }
              return;
            }
            showAlert({ message: "server_is_offline" });
          } catch (e) {}
        }}
      >
        <Text text={server.name} className={`${styles.title} fs-16 fw-6`} />
        <Text text={parseWalletAddress(server.address)} className={`${styles.address} fs-12 fw-4 text-9cabc9`} />
      </section>
      <section className="right"></section>
    </Card>
  );
};

export default ServersCard;
