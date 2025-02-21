import { Text } from "@components/index";
import { useAlertsSelector } from "@hooks/use-selector";
import { REMOVE_OLDEST_ALERT } from "@reducers/alerts.reducer";
import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import styles from "./alerts.module.scss";
import AnimatedLayout from "@navigation/AnimatedLayout";

const animationVariants = {
  hidden: { opacity: 0, x: 0, y: -64 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const Alerts = () => {
  const dispatch = useDispatch();
  const { alerts = [] } = useAlertsSelector();
  React.useEffect(() => {
    if (alerts.length > 0) {
      const timeout = setTimeout(() => {
        dispatch(REMOVE_OLDEST_ALERT());
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [alerts.length]);

  if (alerts.length > 0) {
    return (
      <div className={styles.root}>
        {alerts.map((alert, index) => {
          return (
            <AnimatedLayout key={`alert-${index}`} variants={animationVariants} className="mb-4">
              <div className={`${styles.alert} ${styles[alert.type]}`}>
                <Text key={`alert-${index}`} text={alert.message} data={alert.data} />
              </div>
            </AnimatedLayout>
          );
        })}
      </div>
    );
  }
  return null;
};

export default Alerts;
