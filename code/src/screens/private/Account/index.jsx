import { CHANGE_LIST_TITLE } from "@reducers/loader.reducer";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./account.module.scss";
import { Card, CARD_VARIANTS, Image, Text } from "@components/index";
import { useNavigate } from "react-router-dom";
// import BuiltOnCosmos from "@svgs/built-on-cosmos.svg";
import SubscriptionsIcon from "@svgs/subscriptions-icon.svg";
import WalletDetailsIcon from "@svgs/wallet-details-icon.svg";
import AddDVPNIcon from "@svgs/payments.svg";
import LogoutIcon from "@svgs/logout-icon.svg";
import SwapIcon from "@svgs/swap-icon.svg";

import RightArrowIcon from "@svgs/right-arrow-icon.svg";
import useModal from "@hooks/use-modal";
import useOpenWindow from "@hooks/use-open-window";
import { links } from "@root/constants";
import { getMobileOS } from "@helpers/getOSType";

const navs = [
  {
    title: "subscriptions",
    icon: SubscriptionsIcon,
    href: "/user/subscriptions",
  },
  {
    title: "wallet_details",
    icon: WalletDetailsIcon,
    href: "/user/wallet-details",
  },
  {
    title: "add_balance",
    icon: AddDVPNIcon,
    href: "/user/add-balance",
  },
];

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { openWindow } = useOpenWindow();
  React.useEffect(() => {
    dispatch(
      CHANGE_LIST_TITLE({
        title: "account",
        canGoBack: false,
      })
    );
  }, []);
  return (
    <div className={styles.root}>
      <section className={styles.top}>
        {navs.map((n, i) => {
          return (
            <Card
              variant={CARD_VARIANTS.PRIMARY}
              key={`acc-nav-${i}`}
              onClick={() => navigate(n.href)}
              className={`${styles.card} my-12 px-16`}
            >
              <section className={styles.left}>
                <section className={styles.image}>
                  <Image
                    src={n.icon}
                    height={"20px"}
                  />
                </section>
                <Text
                  text={n.title}
                  className="fs-14 fw-5 ml-6"
                />
              </section>
              <section className={styles.right}>
                <Image
                  src={RightArrowIcon}
                  height={"14px"}
                />
              </section>
            </Card>
          );
        })}
        {getMobileOS() !== "ios" && (
          <Card
            variant={CARD_VARIANTS.PRIMARY}
            onClick={() => openWindow({ url: links.SWAP_DVPN })}
            className={`${styles.card} my-12 px-16`}
          >
            <section className={styles.left}>
              <section className={styles.image}>
                <Image
                  src={SwapIcon}
                  height={"20px"}
                />
              </section>
              <Text
                text={"swap_to_get_dvpn"}
                className="fs-14 fw-5 ml-6"
              />
            </section>
            <section className={styles.right}>
              <Image
                src={RightArrowIcon}
                height={"14px"}
              />
            </section>
          </Card>
        )}
        <Card
          variant={CARD_VARIANTS.PRIMARY}
          onClick={() => showModal({ name: "logout" })}
          className={`${styles.card} my-12 px-16`}
        >
          <section className={styles.left}>
            <section className={styles.image}>
              <Image
                src={LogoutIcon}
                height={"20px"}
              />
            </section>
            <Text
              text={"logout"}
              className="fs-14 fw-5 ml-6"
            />
          </section>
          <section className={styles.right}>
            <Image
              src={RightArrowIcon}
              height={"14px"}
            />
          </section>
        </Card>
      </section>
      {/* <section className={`${styles.bottom} py-36`}>
        <Image src={BuiltOnCosmos} className={styles.image} />
      </section> */}
    </div>
  );
};

export default Account;
