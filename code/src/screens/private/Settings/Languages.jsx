import { langs } from "@root/constants";
import React from "react";
import styles from "./languages.module.scss";
import { BTN_VARIANTS, Button, Card, Text } from "@components/index";
import useTranslation from "@hooks/use-translation";
import CheckIcon from "@svgs/check-icon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";

const Languages = () => {
  const dispatch = useDispatch();
  const { language, changeLanguage } = useTranslation();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "languages",
        canGoBack: true,
      })
    );
    const element = document.getElementById("top");
    if (element) {
      element.scrollIntoView();
    }
  }, []);

  return (
    <div className={styles.root} id="top">
      {Object.entries(langs).map(([key, value]) => {
        return (
          <Card
            variant={BTN_VARIANTS.SECONDARY}
            onClick={async () => {
              const done = await changeLanguage(key);
              if (done) {
                navigate(-2, { replace: true });
              }
            }}
            className={`${styles.language} px-14 py-4 my-8`}
            key={`lang-${key}`}
          >
            <section className={styles.left}>
              <Text
                text={value.local}
                className="fs-16 fw-5 text-e9e9e9 my-6"
              />
              <Text
                text={value.global}
                className="fs-12 fw-4 text-8a94a3 mb-2"
              />
            </section>
            {language === key && <img src={CheckIcon} alt="" />}
          </Card>
        );
      })}
    </div>
  );
};

export default Languages;
