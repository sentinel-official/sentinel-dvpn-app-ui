import { APP_DENOM, CHAIN_ID, DELETE_ACCOUNT_ADDRESS, FEE_GRANT_ADDERSS, GAS_PRICE_AMOUNT } from "@root/constants";
import Axios from "./Axios";

const authServices = {
  getUniqueKey: () =>
    Axios.get("/blockchain/keywords")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  login: ({ mnemonic }) =>
    Axios.post("/blockchain/wallet", { mnemonic })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchWalletAddress: () =>
    Axios.get("/blockchain/wallet")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchAccountBalance: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/balance`)
      .then((response) => {
        if (response.request.status === 500) {
          return { data: null, error: true };
        }
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  registerWalletAddress: (walletAddress) =>
    Axios.post("/proxy/wallet", { address: walletAddress })
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
  sendBackTokens: ({ walletAddress, balance }) =>
    Axios.post(
      `/blockchain/wallet/${DELETE_ACCOUNT_ADDRESS}/balance`,
      {
        amount: Number.parseInt(balance).toString(),
        denom: APP_DENOM,
        memo: `Deletion of Account: ${walletAddress}`,
      },
      {
        headers: {
          "x-chain-id": CHAIN_ID,
          "x-gas-prices": GAS_PRICE_AMOUNT,
        },
      }
    )
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
};

export default authServices;
