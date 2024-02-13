import React from "react";
import styles from "./external-links.module.scss";
import Button, { variants } from "../../components/Button";
import CloseIcon from "../../assets/icons/close-icon.svg";
import Loader from "../../components/Loader";

const ExternalLinksModal = ({ link, title, onClose }) => {
  const [showLoader, setShowLoader] = React.useState(true);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <section className={styles.header}>
            <span className={styles.title}>{title}</span>
            <Button
              className={styles["close-btn"]}
              icon={CloseIcon}
              variant={variants.TRANSPARENT}
              onClick={onClose}
            />
          </section>
          <section className={styles.embeded}>
            <iframe
              id="my-iframe"
              src={link}
              title={title}
              onLoad={() => setShowLoader(false)}
            />
          </section>
        </div>
      </div>
      {showLoader && <Loader />}
    </>
  );
};

export default ExternalLinksModal;
