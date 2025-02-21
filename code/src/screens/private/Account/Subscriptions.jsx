import { Button, Card, Text } from "@components/index";
import { useUserSelector } from "@hooks/use-selector";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./account.module.scss";
import { parseRemaingDaysOfSubscription } from "@helpers/parse.data";
import useModal from "@hooks/use-modal";
import useRefetch from "@hooks/use-refetch";

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { subscription, isSubscriptionFetched } = useUserSelector();
  const refetch = useRefetch();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "subscriptions",
        canGoBack: true,
      })
    );
  }, []);
  const inActive = React.useMemo(() => parseRemaingDaysOfSubscription(subscription.inactiveAt), [subscription.inactiveAt]);
  return (
    <>
      {/* {subscriptions.map(() => {
        return <></>;
        residential_nodes
      })} */}

      <Card className={`${styles.subscriptions} p-16`}>
        <section className={styles.left}>
          <Text
            text={"datacentre_nodes"}
            className="fs-12 fw-5 text-9cabc9 mb-4"
          />
          <Text
            text={"days_remaining"}
            data={{
              value: inActive,
            }}
            className="fs-16 fw-5"
          />
        </section>
        <section className={styles.right}>
          {isSubscriptionFetched ? (
            inActive === 0 && (
              <Button onClick={() => showModal({ name: "subscription" })}>
                <Text
                  text={"subscribe"}
                  className="fs-12 fw-5"
                />
              </Button>
            )
          ) : (
            <Button onClick={refetch}>
              <Text
                text={"retry"}
                className="fs-12 fw-5"
              />
            </Button>
          )}
        </section>
      </Card>
    </>
  );
};

export default Subscriptions;
