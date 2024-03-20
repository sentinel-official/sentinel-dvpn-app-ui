import React, { useState } from "react";
import styles from "./legal-cards.module.scss";
import LegalDocIcon from "../../assets/icons/legal-doc-icon.svg";
import VersionIcon from "../../assets/icons/version-icon.svg";

import Card, { variants } from "../../components/Card";
import { useSelector } from "react-redux";
import ExternalLinksModal from "./ExternalLinksModal";

const legalDocs = [
  {
    title: "Terms of Service",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/terms-of-service.html",
  },
  {
    title: "Privacy Policy",
    icon: LegalDocIcon,
    href: "https://www.sentinel.co/privacy-policy.html",
  },
];

const LegalCards = () => {
  const version = useSelector((state) => state.home.version);

  const [state, setState] = useState({
    isExternalLinkOpen: false,
    title: null,
    link: null,
  });

  const handleExternalLinkModal = ({ link = null, title = null }) => {
    if (link && title) {
      setState((prevState) => ({
        ...prevState,
        isExternalLinkOpen: true,
        title,
        link,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isExternalLinkOpen: false,
        title: "",
        link: "",
      }));
    }
  };

  return (
    <>
      <div className={styles.root}>
        <span className={styles.title}>Legal</span>

        {legalDocs.map((doc) => {
          return (
            <Card
              key={doc.title}
              className={styles["card"]}
              variant={variants.SECONDARY}
            >
              <button
                className={styles["doc-card"]}
                onClick={() =>
                  handleExternalLinkModal({ link: doc.href, title: doc.title })
                }
              >
                <section>
                  <img src={doc.icon} alt="" />
                  <span>{doc.title}</span>
                </section>
              </button>
            </Card>
          );
        })}

        <Card variant={variants.SECONDARY} className={styles["card"]}>
          <button className={styles.version}>
            <section>
              <img src={VersionIcon} alt="" />
              <span>App Version</span>
            </section>
            <span className={styles.value}>{version}</span>
          </button>
        </Card>
      </div>
      {state.isExternalLinkOpen && (
        <ExternalLinksModal
          link={state.link}
          onClose={() => handleExternalLinkModal({ link: null, title: null })}
          title={state.title}
        />
      )}
    </>
  );
};

export default LegalCards;
