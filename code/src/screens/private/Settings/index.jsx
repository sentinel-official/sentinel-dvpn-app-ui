import Card, { CARD_VARIANTS } from "@components/Card";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Image, Text } from "@components/index";
import styles from "./settings.module.scss";
import useTranslation from "@hooks/use-translation";
import { langs } from "@root/constants";
import LanguageIcon from "@svgs/language-icon.svg";
import DVPN from "@containers/Settings/DVPN";
import Legal from "@containers/Settings/Legal";
import Support from "@containers/Settings/Support";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language } = useTranslation();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "settings",
        canGoBack: false,
      })
    );
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, []);
  return (
    <div className={styles.root} id="top">
      {/* <Card
        variant={CARD_VARIANTS.SECONDARY}
        onClick={() => navigate("languages")}
        className={`${styles.card} my-12 px-16`}
      >
        <section className={styles.left}>
          <Image src={LanguageIcon} height={"20px"} />
          <Text text={"language"} className="fs-14 fw-5 ml-8" />
        </section>
        <section className={styles.right}>
          <Text
            text={`${langs[language]?.local}`}
            className="fs-14 fw-5 ml-8 text-9cabc9"
          />
        </section>
      </Card> */}
      <DVPN />
      <Legal />
      <Support />
    </div>
  );
};

export default Settings;
