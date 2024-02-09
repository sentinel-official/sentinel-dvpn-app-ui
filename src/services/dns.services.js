import Axios from "./Axios";

const dnsServices = {
  getAvailableDNS: () =>
    Axios.get("/dns/list")
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),

  getCurrentDNS: () =>
    Axios.get("/dns/current")
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),

  putDNS: (data) =>
    Axios.put("/dns", data)
      .then((response) => response.data)
      .catch((e) => {
        throw new Error(e);
      }),
};

export default dnsServices;
