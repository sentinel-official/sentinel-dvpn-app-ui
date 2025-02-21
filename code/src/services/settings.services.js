import { FEE_GRANT_ADDERSS } from "@root/constants";
import Axios from "./Axios";

const settingsServices = {
  fetchAvailableDNS: () =>
    Axios.get("/dns/list")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  fetchCurrentDNS: () =>
    Axios.get("/dns/current")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  fetchCurrnetRPC: () =>
    Axios.get("/blockchain/endpoint")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  changeCurrnetRPC: ({ host, port }) =>
    Axios.post("/blockchain/endpoint", { host, port })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  changeDNS: (data) =>
    Axios.put("/dns", data)
      .then((response) => response)
      .catch((e) => {
        throw e;
      }),
  fetchFeeGrantDetails: (walletAddress) =>
    Axios.get(`/blockchain/wallet/${walletAddress}/grants/${FEE_GRANT_ADDERSS}`)
      .then((response) => response)
      .catch((error) => error),
  shareLogs: () =>
    Axios.get("/registry/logs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
};

export default settingsServices;
