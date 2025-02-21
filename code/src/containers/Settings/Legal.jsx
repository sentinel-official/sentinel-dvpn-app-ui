import { links } from "@root/constants";
import React from "react";
import styles from "./styles.module.scss";
import { Card, CARD_VARIANTS, Image, Text } from "@components/index";
import VersionIcon from "@svgs/version-icon.svg";
import LegalDocIcon from "@svgs/legal-doc-icon.svg";
import useOpenWindow from "@hooks/use-open-window";
import { useUserSelector } from "@hooks/use-selector";

const legalDocs = [
  {
    title: "terms_of_service",
    icon: LegalDocIcon,
    href: links.TOS,
  },
  {
    title: "privacy_policy",
    icon: LegalDocIcon,
    href: links.PP,
  },
];

const Legal = () => {
  const { openWindow } = useOpenWindow();
  const { app } = useUserSelector();
  return (
    <div className={`${styles.root} my-18`}>
      <Text text={"legal"} className="fs-16 fw-6 text-9cabc9" />
      {legalDocs.map((l, i) => {
        return (
          <Card
            variant={CARD_VARIANTS.SECONDARY}
            onClick={() => openWindow({ url: l.href })}
            className={`${styles.card} my-4 px-14`}
            key={`legal-${i}}`}
          >
            <section className={styles.left}>
              <Image src={l.icon} height={"20px"} />
              <Text text={l.title} className="fs-14 fw-5 ml-8" />
            </section>
          </Card>
        );
      })}
      <Card
        variant={CARD_VARIANTS.SECONDARY}
        className={`${styles.card} my-4 px-14`}
      >
        <section className={styles.left}>
          <Image src={VersionIcon} height={"20px"} />
          <Text text={"version"} className="fs-14 fw-5 ml-8" />
        </section>
        <section className={styles.right}>
          <Text text={app.version} className="fs-14 fw-5 ml-8 text-9cabc9" />
        </section>
      </Card>
    </div>
  );
};

export default Legal;
