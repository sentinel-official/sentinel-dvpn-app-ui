import React from "react";
import styles from "./styles.module.scss";
import HomeIcon from "@svgs/bottom-tab/tab-home-icon.svg";
import NodesIcon from "@svgs/bottom-tab/tab-nodes-icon.svg";
import RecentsIcon from "@svgs/bottom-tab/tab-recents-icon.svg";
import AccountIcon from "@svgs/bottom-tab/tab-account-icon.svg";
import SettingsIcon from "@svgs/bottom-tab/tab-settings-icon.svg";
import { BTN_VARIANTS, Button, Image, Text } from "@components/index";
import { useLocation, useNavigate } from "react-router-dom";

const navs = [
  { icon: HomeIcon, href: "/user", title: "home" },
  { icon: NodesIcon, href: "/user/countries", title: "nodes" },
  { icon: RecentsIcon, href: "/user/recent-servers", title: "recent" },
  { icon: AccountIcon, href: "/user/account", title: "account" },
  { icon: SettingsIcon, href: "/user/settings", title: "settings" },
];

const paths = ["/user/countries", "/user/recent-servers", "/user/account", "/user/settings"];

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {navs.map((nav, index) => {
        const isActive = React.useMemo(() => location.pathname === nav.href, [location.pathname]);

        return (
          <Button
            className={`${styles.button} ${isActive ? styles.active : ""}  pt-12`}
            variant={BTN_VARIANTS.TRANSPARENT}
            key={`nav-${index}`}
            disabled={isActive}
            onClick={() => {
              if (paths.includes(location.pathname)) {
                navigate(nav.href, { replace: true });
                return;
              }

              if (location.pathname === "/user") {
                navigate(nav.href);
                return;
              }
            }}
          >
            <Image src={nav.icon} />
            <Text text={nav.title} className={`fs-12 fw-400 ${styles.text}`} />
          </Button>
        );
      })}
    </>
  );
};

export default BottomNavBar;
