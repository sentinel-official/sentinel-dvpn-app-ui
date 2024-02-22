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
  getIpAddress: async (deviceToken) => {
    let resp;
    await Axios.get("/proxy/ip", {
      headers: {
        "x-device-token": deviceToken,
      },
    })
      .then((response) => {
        resp = response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          resp = { error: "unauthorizedDevice" };
        } else {
          resp = error;
        }
      });
    return resp;
  },
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
    let isAuthorised = true;
    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
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
    let isAuthorised = true;

    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
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
    let isAuthorised = true;

    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
  },
};

export default proxyServices;
