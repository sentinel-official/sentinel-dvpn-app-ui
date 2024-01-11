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

const APIService = {
  getKey,
  getWallet,
  setWallet,
  getIpAddress,
};

export default APIService;
