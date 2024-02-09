import Axios from "./Axios";

const registryServices = {
  setKey: (data) =>
    Axios.post("/registry", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getKey: (key) =>
    Axios.get(`/registry?key=${key}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
};

export default registryServices;
