import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "x-key": "SnLnkORrZuzYsEPb",
  },
  timeout: 30000,
});

export default Axios;
