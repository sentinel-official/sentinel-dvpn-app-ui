import { BTN_VARIANTS, Button, Card, Image, Text } from "@components/index";
import React from "react";
import styles from "./bottom-card.module.scss";
import SelectedServer from "./SelectedServer";
import IPAddress from "./IPAddress";
import InfoIcon from "@svgs/info-icon.svg";
import QuickConnectIcon from "@svgs/quick-connect-icon.svg";
import useQuickConnect, { useDisconnectVPN } from "@hooks/use-quick-connect";
import { useDeviceSelector, useVPNSelector } from "@hooks/use-selector";

const BottomCard = () => {
  const quickConnect = useQuickConnect();
  const disconnectVPN = useDisconnectVPN();
  const { recentServers } = useDeviceSelector();
  const { isConnected } = useVPNSelector();
  const selected = React.useMemo(() => {
    if (recentServers && recentServers.length > 0) {
      return recentServers[0];
    }
  }, [recentServers, recentServers[0]]);
  return (
    <div className={styles.root}>
      <Card className={`${styles["details-card"]} mb-12 mt-8`}>
        <section className="p-14">
          <SelectedServer />
          <IPAddress />
        </section>
        {!isConnected && (
          <section className={`${styles.protected} py-8 px-14`}>
            <img src={InfoIcon} alt="" />
            <Text text={"you_are_not_protected"} className={`fs-14 fw-5 ml-4`} />
          </section>
        )}
      </Card>
      <Button
        className={`${styles["quick-connect-btn"]} mb-6`}
        variant={isConnected ? BTN_VARIANTS.SECONDARY : BTN_VARIANTS.PRIMARY}
        onClick={async () => {
          if (isConnected) {
            await disconnectVPN();
            return;
          }
          if (selected && selected.name) {
            await quickConnect({ server: selected });
            return;
          }
          quickConnect();
        }}
      >
        {isConnected ? (
          <Text text={"disconnect"} className="text-ff0000" />
        ) : (
          <>
            <Image src={QuickConnectIcon} />
            <Text text={"quick_connect"} />
          </>
        )}
      </Button>
    </div>
  );
};

export default BottomCard;
