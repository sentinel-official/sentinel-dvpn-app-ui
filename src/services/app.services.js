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

const APIService = {
  getKey,
  getWallet,
  setWallet,
};

export default APIService;
