import { Button, Image } from "@components/index";
import React from "react";
import QuickConnectIcon from "@svgs/quick-connect-icon.svg";
import useQuickConnect from "@hooks/use-quick-connect";
import { useNavigate } from "react-router-dom";
import styles from "./quick-connect-btn.module.scss";
import { useUserSelector, useVPNSelector } from "@hooks/use-selector";
import useModal from "@hooks/use-modal";

const QuickConnect = ({ country, city }) => {
  const { isConnected, isConnecting } = useVPNSelector();
  const quickConnect = useQuickConnect();
  const navigate = useNavigate();
  const { subscription } = useUserSelector();
  const { showModal } = useModal();

  const connect = React.useCallback(async () => {
    if (!(subscription && subscription.id)) {
      showModal({ name: "subscription" });
      return;
    }
    if (city && city.name) {
      await quickConnect({ city });
      navigate(-2, { replace: true });
      return;
    }
    await quickConnect({ country });
    navigate(-1, { replace: true });
  }, []);

  return (
    <Button className={styles["quick-connect-btn"]} onClick={connect} disabled={isConnected || isConnecting}>
      <Image src={QuickConnectIcon} />
    </Button>
  );
};

export default QuickConnect;
