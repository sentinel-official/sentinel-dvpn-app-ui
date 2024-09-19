import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import styles from "./add-balance.module.scss";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CARD_VARIANTS, Image, RadioButton, Text } from "@components/index";
import SentinelLogo from "@pngs/sentinel-logo.png";
import { usePaymentsSelector, useUserSelector } from "@hooks/use-selector";
import RadioCheckIcon from "@components/RadioButton/RadioCheckIcon";
import { dispatchBuyProduct } from "@actions/payments.actions";
import useRefetch from "@hooks/use-refetch";
import { useNavigate } from "react-router-dom";
import useAlerts, { ALERT_TYPES } from "@hooks/use-alerts";
import useModal from "@hooks/use-modal";
import { sleep } from "@root/redux/helpers/getTxDetails";
import useLoader from "@hooks/use-loader";
import { getMobileOS } from "@helpers/getOSType";

const AddBalance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refetch = useRefetch();
  const showAlert = useAlerts();
  const { showModal } = useModal();
  const { startLoader, stopLoader } = useLoader();
  const { products = [] } = usePaymentsSelector();
  const [selected, setSelected] = React.useState({});

  const { balance } = useUserSelector();

  const oldBalance = balance;

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "add_balance",
        canGoBack: true,
      })
    );
  }, []);

  React.useEffect(() => {
    if (products.length > 0) {
      setSelected(products[Math.floor(products.length / 2)]);
    }
  }, [products.length]);

  const refresh = React.useCallback(
    async (td) => {
      try {
        const maxAttempts = 5;
        let attempt = 0;
        startLoader({ message: "refreshing_your_details" });
        while (attempt < maxAttempts) {
          const isRefetched = await refetch(false, false);
          if (isRefetched && balance !== oldBalance) {
            stopLoader();
            return true;
          }
          await sleep(3000);
          attempt++;
        }
        stopLoader();
        if (balance === oldBalance && Object.keys(td).length > 0) {
          showModal({ name: "purchase-pending", cancellable: false, data: td, variant: "primary" });
        }
        return false;
      } catch (e) {
        showModal({ name: "purchase-pending", cancellable: false, data: td, variant: "primary" });
        return false;
      }
    },
    [balance]
  );

  return (
    <div className={`${styles.root} px-14 pb-24`}>
      <section className={styles.top}>
        <Text
          text={"get_some_dvpn"}
          className="fs-24 fw-6 mb-16 "
        />
        <Text
          text={"get_some_dvpn_desc"}
          className="fs-14 fw-4 text-9cabc9 mb-28"
        />
        <section className={styles.offers}>
          {products.map((p) => {
            const amount = p.identifier.split("_")[1];
            return (
              <Card
                key={p.identifier}
                className={`${styles.card} px-12  mb-8`}
                onClick={() => setSelected(p)}
                variant={CARD_VARIANTS.SECONDARY}
              >
                <section className={styles.left}>
                  <RadioCheckIcon isChecked={selected.identifier === p.identifier} />
                  <Text
                    text={`${Number.parseInt(amount).toLocaleString()}`}
                    className="fs-20 fw-4 ml-6 mr-4"
                  />
                  <Image
                    src={SentinelLogo}
                    width={"16px"}
                  />
                </section>
                <Text
                  text={p.localizedPriceString}
                  className="fs-20 fw-4"
                />
              </Card>
            );
          })}
        </section>
      </section>
      <section className={styles.bottom}>
        <Button
          className={`${styles["buy-button"]} mb-14`}
          onClick={async () => {
            try {
              const payload = await dispatch(dispatchBuyProduct(selected)).unwrap();
              if (payload && payload.transaction) {
                const isRefreshed = await refresh(payload.transaction);
                if (isRefreshed) {
                  navigate(-1, { replace: true });
                }
              }
            } catch (e) {
              showAlert({ type: ALERT_TYPES.error, message: "error_adding_balance" });
            }
          }}
        >
          <Text
            text={"buy_now"}
            className="py-8"
          />
        </Button>
        <Text
          text={"get_some_dvpn_foot_note"}
          className={`text-9cabc9 fs-12 fw-4`}
          data={{
            amount: selected?.localizedPriceString,
            tokens: Number.parseInt(selected?.identifier?.split("_")[1])?.toLocaleString(),
            account: getMobileOS() === "ios" ? "iTunes" : "Google",
          }}
        />
      </section>
    </div>
  );
};

export default AddBalance;
