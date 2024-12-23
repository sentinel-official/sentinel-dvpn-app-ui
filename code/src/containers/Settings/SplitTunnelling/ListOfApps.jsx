import {
  dispatchGetAllApps,
  dispatchGetTunnelledApps,
  dispatchSetTunnelledApps,
} from "@actions/tunnel.actions";
import { useTunnelSelector } from "@hooks/use-selector";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./list-of-apps.module.scss";
import { Card, Image, Text } from "@components/index";
import AndroidIcon from "@svgs/android-icon.svg";
import CheckIcon from "@svgs/check-icon.svg";
import useLoader from "@hooks/use-loader";

const ListOfApps = () => {
  const { isEnabled, allApps, tunnelledApps } = useTunnelSelector();
  const dispatch = useDispatch();

  const { startLoader, stopLoader } = useLoader();
  React.useEffect(() => {
    const fetchApps = async () => {
      try {
        startLoader({ message: "fetching_apps" });
        if (isEnabled) {
          await Promise.allSettled([
            dispatch(dispatchGetAllApps()),
            dispatch(dispatchGetTunnelledApps()),
          ]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopLoader();
      }
    };
    fetchApps();
  }, [isEnabled]);

  if (!isEnabled) {
    return (
      <div className={`${styles["enable"]} mt-14`}>
        <Text text={"enable_to_tunnel_apps"} className={"text-9cabc9"} />
      </div>
    );
  }

  if (isEnabled && allApps && allApps.length > 0) {
    return (
      <div className={styles.root}>
        {allApps.map((item, index) => {
          const icon = item.appIcon || AndroidIcon;
          const isTunnelled = tunnelledApps.includes(item.packageName) || false;
          return (
            <Card
              className={`${styles.application} px-6 py-8`}
              key={`app-${item.appName}-${index}`}
              onClick={() => dispatch(dispatchSetTunnelledApps(item))}
            >
              <section className={styles.left}>
                <Image src={icon} className={styles.icon} />
                <section className={styles.content}>
                  <Text
                    text={`${item.appName}`}
                    className={`${styles["text"]} fs-14 fw-4`}
                  />
                  <Text
                    text={item.packageName}
                    className={`${styles["text"]} fs-10 fw-4 text-8a94a3`}
                  />
                </section>
              </section>
              {isTunnelled && (
                <section className={styles.right}>
                  <Image
                    src={CheckIcon}
                    className={styles.icon}
                    height={"24px"}
                  />
                </section>
              )}
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`${styles["no-apps"]} mt-14`}>
      <Text text={"no_apps_to_tunnel"} className={"text-9cabc9"} />
      <Text
        text={"refresh"}
        className={"text-link pointer"}
        onClick={() => dispatch(dispatchGetAllApps())}
      />
    </div>
  );
};

export default ListOfApps;
