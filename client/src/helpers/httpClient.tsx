import axios from "axios";

const httpClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-type": "application/json",
  },
});

export default httpClient;
