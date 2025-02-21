import { Button, Card, Text } from "@components/index";
import { useAuthSelector } from "@hooks/use-selector";
import React from "react";
import styles from "./qr-code-card.module.scss";
import { parseWalletAddress } from "@helpers/parse.data";
import QRCode from "react-qr-code";
import copy from "copy-to-clipboard";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import { getMobileOS } from "@helpers/getOSType";
const QRCodeCard = () => {
  const { walletAddress } = useAuthSelector();
  const showAlert = useAlerts();
  return (
    <Card className={`${styles.root} p-16 my-16`}>
      <section className={styles.top}>
        <Text
          text={"wallet_address"}
          className="fs-14 fw-5 text-9cabc9"
        />
        <Text
          text={parseWalletAddress(walletAddress)}
          className="fs-14 fw-5"
          onClick={async () => {
            await copy(walletAddress);
            showAlert({
              type: ALERT_TYPES.success,
              message: "success_wallet_address_copied",
            });
          }}
        />
      </section>
      {getMobileOS() !== "ios" && (
        <>
          <section className={styles.middle}>
            <QRCode
              value={walletAddress}
              level={"L"}
            />
          </section>
          <section className={styles.bottom}>
            <Button
              onClick={async () => {
                await copy(walletAddress);
                showAlert({
                  type: ALERT_TYPES.success,
                  message: "success_wallet_address_copied",
                });
              }}
              className="py-12"
            >
              <Text text="copy_wallet_address" />
            </Button>
          </section>
        </>
      )}
    </Card>
  );
};

export default QRCodeCard;
