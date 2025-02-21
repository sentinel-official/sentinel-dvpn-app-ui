import React from "react";
import styles from "./loader.module.scss";
import { useLoaderSelector } from "@hooks/use-selector";
import { Text } from "..";
import { createPortal } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
const Loader = ({ fromRoot = false }) => {
  const { loading, message, description, data } = useLoaderSelector();
  if (loading || fromRoot) {
    return (
      <>
        {createPortal(
          <div className={styles.root}>
            <LoadingIndicator />

            {message && (
              <Text
                className="text-ffffff mt-36 mb-16 fs-16 fw-5"
                text={message}
                data={data}
              />
            )}
            {description && (
              <Text className="text-9c9c9c fs-12 fw-4" text={description} />
            )}
          </div>,
          document.body
        )}
      </>
    );
  }
  return null;
};

export default Loader;
