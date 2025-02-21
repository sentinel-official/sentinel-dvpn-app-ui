import { CHAIN_ID, FEE_GRANT_ADDERSS, GAS_PRICE_AMOUNT, PLAN_ID } from "@root/constants";
import Axios from "./Axios";

const userServices = {
  shareLogs: () =>
    Axios.get("/registry/logs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getClipboardData: () =>
    Axios.get("/registry/clipboard")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchApplicationVersion: () =>
    Axios.get("/registry/version")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchLatestAppVersion: () =>
    Axios.get("/proxy/version")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchAvailablePlans: () =>
    Axios.get("/blockchain/plans", { params: { limit: 100000, offset: 0 } })
      .then((response) => {
        return response.data.plans;
      })
      .catch((error) => {
        throw error;
      }),
  fetchUserSubScriptions: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/subscriptions`, {
      params: { limit: 100000, offset: 0 },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  createNewSubscription: (data, feeGrantEnabled) =>
    Axios.post(`/blockchain/plans/${PLAN_ID}/subscription`, data, {
      headers: {
        "x-chain-id": CHAIN_ID,
        "x-gas-prices": GAS_PRICE_AMOUNT,
        ...(feeGrantEnabled ? { "x-fee-granter": FEE_GRANT_ADDERSS } : {}),
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getTXDetails: (txHash) =>
    Axios.get(`blockchain/transactions/${txHash}`)
      .then((response) => response)
      .catch((error) => error),
};

export default userServices;
