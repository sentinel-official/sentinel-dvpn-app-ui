import { BTN_VARIANTS, Button, Card, Image, Text } from "@components/index";
import React from "react";
import styles from "./balance-card.module.scss";
import { useUserSelector } from "@hooks/use-selector";
import formatAmount from "@helpers/formatAmount";
import PoweredByCosmosIcon from "@svgs/powered-by-cosmos.svg";
import ReloadIcon from "@svgs/reload-icon.svg";
import BalanceIcon from "@svgs/balance-icon.svg";
import useRefetch from "@hooks/use-refetch";

const BalanceCard = () => {
  const { balance } = useUserSelector();
  const refetch = useRefetch();

  return (
    <Card className={`${styles.root}`}>
      <section className={`${styles.top} px-12`}>
        <section className={styles.left}>
          <Image
            src={BalanceIcon}
            className={styles.icon}
          />
          <section className={`${styles["details"]} ml-6 py-2`}>
            <Text
              text={`${formatAmount(balance / 1e6)}`}
              className={`fs-22 fw-6 ${styles.balance}`}
            />
            <Text
              text={"your_tokens"}
              className={`fs-14 fw-6 text-9cabc9 ml-6`}
            />
          </section>
        </section>
        <section className={styles.right}>
          <Button
            variant={BTN_VARIANTS.TRANSPARENT}
            className={styles.icon}
            onClick={refetch}
          >
            <Image
              src={ReloadIcon}
              className={styles.icon}
            />
          </Button>
        </section>
      </section>
      {/* <section className={`${styles.bottom} py-2`}>
        <Image className={styles.icon} src={PoweredByCosmosIcon} />
      </section> */}
    </Card>
  );
};

export default BalanceCard;
