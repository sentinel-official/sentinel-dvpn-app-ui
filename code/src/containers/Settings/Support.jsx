import React from "react";
import styles from "./styles.module.scss";
import {
  BTN_VARIANTS,
  Button,
  Card,
  CARD_VARIANTS,
  Image,
  Text,
} from "@components/index";
import settingsServices from "@services/settings.services";
import ShareLogsIcon from "@svgs/share-logs-icon.svg";

import TwitterIcon from "@svgs/twitter-icon.svg";
import TelegramIcon from "@svgs/telegram-icon.svg";
import GithubIcon from "@svgs/github-icon.svg";
import GlobeIcon from "@svgs/globe-icon.svg";
import { getMobileOS } from "@helpers/getOSType";
import { links } from "@root/constants";
import useOpenWindow from "@hooks/use-open-window";

const constants = [
  {
    icon: TwitterIcon,
    link: links.TWITTER,
  },
  {
    icon: GithubIcon,
    link: getMobileOS() === "ios" ? links.GITHUB_IOS : links.GITHUB_ANDROID,
  },
  {
    icon: TelegramIcon,
    link: links.TELEGRAM,
  },
  {
    icon: GlobeIcon,
    link: links.SENTINEL_HOME,
  },
];

const Support = () => {
  const { openWindow } = useOpenWindow();
  return (
    <div className={`${styles.root} my-18`}>
      <Text text={"support"} className="fs-16 fw-6 text-9cabc9" />

      <Card
        variant={CARD_VARIANTS.SECONDARY}
        onClick={() => settingsServices.shareLogs()}
        className={`${styles.card} my-4 px-14`}
      >
        <section className={styles.left}>
          <Image src={ShareLogsIcon} height={"20px"} />
          <Text text={"share_logs"} className="fs-14 fw-5 ml-8" />
        </section>
      </Card>
      <section className={`${styles.support}  my-18`}>
        <section className={styles.social}>
          {constants.map((i) => {
            return (
              <Button
                variant={BTN_VARIANTS.TRANSPARENT}
                key={i.link}
                onClick={() => {
                  openWindow({ url: i.link });
                }}
                className={`${styles["social-btn"]} p-0`}
              >
                <Image src={i.icon} />
              </Button>
            );
          })}
        </section>
        <section className={styles.report}>
          <Text text={"any_problems"} className="fs-14 fw-5 text-9cabc9 mr-4" />
          <Text
            text={"report_an_issue"}
            className="fs-14 fw-5 text-link"
            onClick={() => openWindow({ url: links.MAIL })}
          />
        </section>
      </section>
    </div>
  );
};

export default Support;
