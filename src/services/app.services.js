import axios from "axios";
import Axios from "./Axios";

const getKey = (key) =>
  Axios.get("/registry", { params: { key } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getWallet = () =>
  Axios.get("/blockchain/wallet")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const setWallet = (data) =>
  Axios.post("/blockchain/wallet", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getIpAddress = (deviceToken) =>
  Axios.get("/proxy/ip", {
    headers: {
      "x-device-token": deviceToken,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getBalance = (walletAddress) =>
  Axios.get(`/blockchain/wallet/${walletAddress}/balance`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getCurrentPrice = () =>
  axios
    .get("https://api.coingecko.com/api/v3/coins/sentinel", {
      community_data: false,
      developer_data: false,
      localization: false,
      sparkline: false,
      tickers: false,
    })
    .then((response) => {
      return response?.data?.market_data?.current_price?.usd;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getCountries = (deviceToken) =>
  Axios.get("/proxy/countries", {
    headers: {
      "x-device-token": deviceToken,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getCities = (countryId, deviceToken) =>
  Axios.get(`/proxy/countries/${countryId}/cities`, {
    headers: {
      "x-device-token": deviceToken,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const getNodes = async ({ countryId, cityId, deviceToken }) =>
  Axios.get(`/proxy/countries/${countryId}/cities/${cityId}/servers`, {
    headers: {
      "x-device-token": deviceToken,
    },
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

const APIService = {
  getKey,
  getWallet,
  setWallet,
  getIpAddress,
  getBalance,
  getCurrentPrice,
  getCountries,
  getCities,
  getNodes,
};

export default APIService;
