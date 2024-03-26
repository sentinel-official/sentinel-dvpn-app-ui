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
    console.log(
      "CONSOLE RESPONSE",
      JSON.stringify({
        URL: response.request.responseURL,
        STATUS: response.status,
        DATA: response.data,
      })
    );
    return response;
  },
  (error) => {
    console.log("CONSOLE ERROR", JSON.stringify(error, null, 2));
    return error;
  }
);

export default Axios;
