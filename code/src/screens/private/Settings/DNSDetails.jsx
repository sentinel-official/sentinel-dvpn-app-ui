import {
  BTN_VARIANTS,
  Button,
  Card,
  CARD_VARIANTS,
  Image,
  Text,
} from "@components/index";
import { useSettingsSelector, useUserSelector } from "@hooks/use-selector";
import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./dns-details.module.scss";
import capitalizeFirstLetter from "@helpers/capitalizeFirstLetter";
import CheckIcon from "@svgs/check-icon.svg";
import { dispatchChangeDNS } from "@actions/settings.actions";
import TrashIcon from "@svgs/trash-icon.svg";
import { REMOVE_CUSTOM_DNS } from "@reducers/settings.reducer";

const DNSDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dnsList = [], customDNSList = [] } = useSettingsSelector();
  const { dns } = useUserSelector();

  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "dns_details",
        canGoBack: true,
      })
    );
  }, []);
  return (
    <div className={styles.root}>
      <section className={styles.top}>
        {[...dnsList, ...customDNSList].map((d, index) => {
          const isCheck = d.addresses === dns.addresses;
          return (
            <Card
              variant={CARD_VARIANTS.SECONDARY}
              key={`dns-${index}`}
              className={`${styles.card} my-12 px-16`}
            >
              <section
                className={styles.left}
                onClick={() => dispatch(dispatchChangeDNS(d))}
              >
                <Text
                  text={capitalizeFirstLetter(d.preferredName)}
                  className={`fs-14 fw-5 ml-8 ${
                    isCheck ? "text-ffffff" : "text-9cabc9"
                  }`}
                />
              </section>
              <section className={styles.right}>
                {isCheck && <Image src={CheckIcon} height={"24px"} />}
                {!isCheck && d.isCustom && (
                  <Button
                    variant={BTN_VARIANTS.TRANSPARENT}
                    onClick={() => dispatch(REMOVE_CUSTOM_DNS(d))}
                  >
                    <Image src={TrashIcon} height={"24px"} />
                  </Button>
                )}
              </section>
            </Card>
          );
        })}
      </section>
      <Button
        onClick={() => navigate("new")}
        className={`${styles["add-new-dns-btn"]} mb-36`}
      >
        <Text text={"add_custom_dns"} className="py-8" />
      </Button>
    </div>
  );
};

export default DNSDetails;
