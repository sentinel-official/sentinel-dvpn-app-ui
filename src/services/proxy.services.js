import Axios from "./Axios";

const proxyServices = {
  postDevice: () =>
    Axios.post("/proxy/device", { platform: "OTHER" })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getIpAddress: (deviceToken) =>
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
      }),
  getCountriesList: async (deviceToken, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get("/proxy/countries", {
          params: {
            protocol,
          },
          headers: {
            "x-device-token": deviceToken,
          },
        })
      );
    });
    const responses = [];
    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        responses.push([]);
      }
    }
    return responses.flat(1);
  },
  getCitiesList: async (countryId, deviceToken, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities`, {
          params: {
            protocol,
          },
          headers: {
            "x-device-token": deviceToken,
          },
        })
      );
    });
    const responses = [];
    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        responses.push([]);
      }
    }
    return responses.flat(1);
  },
  getServersList: async (countryId, cityId, deviceToken, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities/${cityId}/servers`, {
          params: {
            protocol,
          },
          headers: {
            "x-device-token": deviceToken,
          },
        })
      );
    });
    const responses = [];
    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        responses.push([]);
      }
    }
    return responses.flat(1);
  },
};

export default proxyServices;
