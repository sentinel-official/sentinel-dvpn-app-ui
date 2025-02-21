import Axios from "./Axios";

const proxyServices = {
  fetchIPAddress: () =>
    Axios.get("/proxy/ip")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  fetchCountriesList: async (protocols = []) => {
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
  fetchCitiesList: async (countryId, protocols = []) => {
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
  fetchServersList: async (countryId, cityId, protocols = []) => {
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
  fetchServersStatus: ({ addresses = [] }) =>
    Axios.post(`/proxy/servers`, { addresses })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  postWindowLink: ({ url }) =>
    Axios.post("/proxy/browser", { url })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
};

export default proxyServices;
