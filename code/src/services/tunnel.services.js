import Axios from "./Axios";

const tunnelServcies = {
  getToggleTunnelEnableStatus: () =>
    Axios.get("/splittunneling/status")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  setToggleTunnelEnableStatus: (status = false) =>
    Axios.post("/splittunneling/status", { status })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  getTunnelledApps: () =>
    Axios.get("/splittunneling/apps")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  setTunnelledApps: (apps) =>
    Axios.post("/splittunneling/apps", { apps })
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  getAllApps: () =>
    Axios.get("/device/apps")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
};
export default tunnelServcies;
