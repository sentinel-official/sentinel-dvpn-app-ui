import { getMobileOS } from "@helpers/getOSType";
import process from "process";
export const APP_DENOM = "udvpn";
export const STATUS_ACTIVE = "STATUS_ACTIVE";
export const PLAN_ID = "32";
export const GAS_PRICE_AMOUNT = 200000;
export const FEE_GRANT_ADDERSS = "sent1vtakcr67ejvknr00vmq8vh6dm9mn5hr6gzu27m";
export const DELETE_ACCOUNT_ADDRESS = "sent1nwmxl7pa7mq5n7s9rfmzljhrxngppg8y0svzve";
export const PAYMENT_KEY = getMobileOS() === "ios" ? process.env.REACT_APP_APPLE_PAY_KEY : process.env.REACT_APP_ANDROID_KEY;
export const PRODUCT_IDENTIFIER = "sentinel.dvpn";
export const CHAIN_ID = "sentinelhub-2";

export const links = {
  RENEW_FIND_MORE: "https://medium.com/sentinel/introduction-of-on-chain-subscriptions-and-time-based-payments-sentinels-biggest-dvpn-protocol-a2b240199f18",
  DOWNLOAD_LATEST_APP: "https://shield.sentinel.co/",
  WHAT_IS_FEE_GRANT: "https://docs.cosmos.network/v0.46/modules/feegrant/",
  TOS: "https://shield.sentinel.co/legal/tos",
  PP: "https://shield.sentinel.co/legal/privacy",
  TWITTER: "https://twitter.com/SentinelDVPN",
  GITHUB_IOS: "https://github.com/sentinel-official/sentinel-dvpn-app-ios",
  GITHUB_ANDROID: "https://github.com/sentinel-official/sentinel-dvpn-app-android",
  TELEGRAM: "https://t.me/SentinelDVPN",
  SENTINEL_HOME: "https://www.sentinel.co/",
  MAIL: "mailto:Support@snt.foundation",
  SWAP_DVPN: "https://swapfast.app/?destinationAsset=udvpn&destinationChainId=sentinelhub-2",
  RPC_LIST_LINK: "https://cosmos.directory/sentinel/nodes",
  APP_UPDATE_LINK: "https://getdvpn.app/update",
  MINTSCAN: "https://www.mintscan.io/sentinel",
  COSMOS_NETWORK: '"https://cosmos.network/"',
  GITHUB_SENTINEL: "https://github.com/sentinel-official",
  NODE_MAP: "https://map.sentinel.co",
  WHITEPAPER: "https://docs.sentinel.co/assets/files/whitepaper-513665f81a5d6c4b462e111926d26f57.pdf",
  CONTRACTS: "https://medium.com/sentinel/introduction-of-on-chain-subscriptions-and-time-based-payments-sentinels-biggest-dvpn-protocol-a2b240199f18",
};

export const langs = {
  en: {
    local: "English",
    global: "English",
  },
  fr: {
    local: "Français",
    global: "French",
  },
  de: {
    local: "Deutsch",
    global: "German",
  },
  hi: {
    local: "हिन्दी",
    global: "Hindi",
  },
  ja: {
    local: "日本語",
    global: "Japanese",
  },
  ko: {
    local: "한국어",
    global: "Korean",
  },
  zh: {
    local: "中文",
    global: "Chinese",
  },
  pt: {
    local: "Português",
    global: "Portuguese",
  },
  ru: {
    local: "Русский",
    global: "Russian",
  },
  es: {
    local: "Español",
    global: "Spanish",
  },
  ar: {
    local: "العربية",
    global: "Arabic",
  },
  tr: {
    local: "Türkçe",
    global: "Turkish",
  },
};
