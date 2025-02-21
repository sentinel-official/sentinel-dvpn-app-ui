import { CHAIN_ID, FEE_GRANT_ADDERSS, GAS_PRICE_AMOUNT } from "@root/constants";
import Axios from "./Axios";

const vpnServices = {
  getConnectedStatus: () =>
    Axios.get("/status")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  postDisconnect: () =>
    Axios.post("/disconnect")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  createConnection: (data) =>
    Axios.post("/connect", data)
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  fetchSessionDetails: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/session`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 404) {
          return null;
        } else {
          throw error;
        }
      }),
  createSession: ({ walletAddress, data, feeGrantEnabled }) =>
    Axios.post(`/blockchain/wallet/${walletAddress}/session`, data, {
      headers: {
        "x-chain-id": CHAIN_ID,
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled ? { "x-fee-granter": FEE_GRANT_ADDERSS } : {}),
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  createCredentials: (data, feeGrantEnabled) =>
    Axios.post("/blockchain/wallet/connect", data, {
      headers: {
        "x-chain-id": CHAIN_ID,
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled ? { "x-fee-granter": FEE_GRANT_ADDERSS } : {}),
      },
    })
      .then((response) => response.data)
      .catch((e) => {
        throw { reason: "failed_create_credentials" };
      }),
};

export default vpnServices;
