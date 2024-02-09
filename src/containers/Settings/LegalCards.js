import React from "react";
import styles from "./legal-cards.module.scss";
import LegalDocIcon from "../../assets/icons/legal-doc-icon.svg";
import VersionIcon from "../../assets/icons/version-icon.svg";

import Card, { variants } from "../../components/Card";
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
  return (
    <div className={styles.root}>
      <span className={styles.title}>Legal</span>

      {legalDocs.map((doc) => (
        <Card key={doc.title} variant={variants.SECONDARY}>
          <button
            onClick={() => window.open(doc.href, "_blank")}
            className={styles["doc-card"]}
          >
            <img src={doc.icon} alt="" />
            <span>{doc.title}</span>
          </button>
        </Card>
      ))}
      <Card variant={variants.SECONDARY}>
        <button className={styles.version}>
          <section>
            <img src={VersionIcon} alt="" />
            <span>App Version</span>
          </section>
          <span className={styles.value}>1.0</span>
        </button>
      </Card>
    </div>
  );
};

export default LegalCards;
