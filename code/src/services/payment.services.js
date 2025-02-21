import { PAYMENT_KEY } from "@root/constants";
import Axios, { AxiosNoTimeout } from "./Axios";

const paymentServices = {
  setup: () =>
    Axios.post("/purchases/setup", { key: PAYMENT_KEY })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  login: ({ address }) =>
    Axios.post("/purchases/login", { address })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  fetchProducts: () =>
    Axios.get("/purchases/products")
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  buyProduct: (product) =>
    AxiosNoTimeout.post("/purchases/buy", product)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};

export default paymentServices;
