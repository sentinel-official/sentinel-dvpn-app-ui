import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "x-key": "SnLnkORrZuzYsEPb",
  },
  timeout: 30000,
});

Axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
    console.log(
      "CONSOLE RESPONSE",
      JSON.stringify(
        {
          URL: response.request.responseURL,
          METHOD: String(response.config.method).toUpperCase(),
          STATUS: response.status,
          DATA: response.data,
        },
        null,
        2
      )
    );
    }
    return response;
  },
  (error) => {
    console.log("CONSOLE ERROR", JSON.stringify(error, null, 1));
    return error;
  }
);

export default Axios;
