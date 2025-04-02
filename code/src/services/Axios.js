import axios from "axios";
import { rpcErrorEvent, updateInternetStatus } from "./events";
import { RPCS } from "@root/constants";

const Axios = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "x-key": "SnLnkORrZuzYsEPb",
  },
  timeout: 30000,
});

Axios.interceptors.request.use(request => {
 return request;
})

Axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`${new Date().toISOString()}: `, `[${String(response.config.method).toUpperCase()}] ${response.request.responseURL}`, {
        STATUS: response.status,
        DATA: response.data,
      });
    }
    if (response.ok || response.status === 200) {
      return response;
    }
    throw { code: response.status };
  },
  async (error) => {
    const name = error.code || "Error";
    const message = error.message || "";
    const resp = error?.response || {};
    const req = error?.request || {};
    const url = error.request.responseURL || "";

    console.error(`${new Date().toISOString()}: ${url}: ${name}: ${message}`, { REQ: req, RESP: resp });
  
    const isGrantsURL = (resp.request.responseURL.includes("/api/blockchain/wallet/") && resp.request.responseURL.includes("/grants/")) || resp.request.responseURL.includes("/api/blockchain/transactions/");
    if (resp.data.error && ["Not Found", "RPC timed out before completing"].includes(resp.data.reason) && !isGrantsURL) {
      const rpc = window.sessionStorage.getItem("rpc")
      const { host = "", port = 0 } = rpc ? JSON.parse(rpc) : {}

      const rpcIndex = RPCS.findIndex(rpcNode => rpcNode.host === host && rpcNode.port === port);

      if (rpcIndex === RPCS.length - 1) {
        await Axios.post("/blockchain/endpoint", RPCS[0]);
      } else { 
        const nextRPC = RPCS[rpcIndex + 1];
        await Axios.post("/blockchain/endpoint", nextRPC)
      }
      window.dispatchEvent(rpcErrorEvent())
      return axios(error.config)
    }

    if (error?.request?.response && typeof error?.request?.response === "object") {
      throw {
        status: error.request.status,
        ...JSON.parse(error?.request?.response),
      };
    } else {
      throw error;
    }
  }
);

export const AxiosNoTimeout = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "x-key": "SnLnkORrZuzYsEPb",
  },
});

export default Axios;
