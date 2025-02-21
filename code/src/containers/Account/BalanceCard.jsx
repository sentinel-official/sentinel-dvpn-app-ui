import { BTN_VARIANTS, Button, Card, Text } from "@components/index";
import React from "react";
import styles from "./balance-card.module.scss";
import { useUserSelector } from "@hooks/use-selector";
import formatAmount from "@helpers/formatAmount";
import ReloadIcon from "@svgs/reload-icon.svg";
import BalanceIcon from "@svgs/balance-icon.svg";
import useRefetch from "@hooks/use-refetch";
import { getMobileOS } from "@helpers/getOSType";

const BalanceCard = () => {
  const { balance, price } = useUserSelector();
  const refetch = useRefetch();
  return (
    <Card className={`${styles.root}`}>
      <section className={`${styles.top} px-12`}>
        <section className={`${styles.left} mr-6`}>
          <img
            src={BalanceIcon}
            alt=""
            className={styles.icon}
          />
          <section className={`${styles["details"]} ml-6`}>
            <Text
              text={`${formatAmount(balance / 1e6)}`}
              className={`fs-22 fw-6`}
            />
            <section className={styles.right}>
              {getMobileOS() !== "ios" && (
                <Text
                  text={`~ $${formatAmount(price * (balance / 1e6))}`}
                  className="fs-13 fw-4 text-9cabc9 mx-6"
                />
              )}
              <Text
                text={"your_tokens"}
                className={`fs-13 fw-6 text-9cabc9`}
              />
            </section>
          </section>
        </section>
        <section className={styles.right}>
          <Button
            variant={BTN_VARIANTS.TRANSPARENT}
            className={styles.icon}
            onClick={refetch}
          >
            <img
              src={ReloadIcon}
              alt=""
              className={styles.icon}
            />
          </Button>
        </section>
      </section>
    </Card>
  );
};

export default BalanceCard;
