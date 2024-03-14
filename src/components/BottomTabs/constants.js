import HomeIcon from "../../assets/icons/bottom-tab/tab-home-icon.svg";
import NodesIcon from "../../assets/icons/bottom-tab/tab-nodes-icon.svg";
import AccountIcon from "../../assets/icons/bottom-tab/tab-account-icon.svg";
import SettingsIcon from "../../assets/icons/bottom-tab/tab-settings-icon.svg";

export const tabs = [
  {
    icon: HomeIcon,
    title: "Home",
    href: "/",
  },
  {
    icon: NodesIcon,
    title: "Nodes",
    href: "/countries",
  },
  {
    icon: AccountIcon,
    title: "Account",
    href: "/account",
  },
  {
    icon: SettingsIcon,
    title: "Settings",
    href: "/settings",
  },
];
