import Axios from "./Axios";

const proxyServices = {
  getIpAddress: () =>
    Axios.get("/proxy/ip")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getCountriesList: async (protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get("/proxy/countries", {
          params: {
            protocol,
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
  getCitiesList: async (countryId, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities`, {
          params: {
            protocol,
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
  getServersList: async (countryId, cityId, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities/${cityId}/servers`, {
          params: {
            protocol,
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
