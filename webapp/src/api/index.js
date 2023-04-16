import axios from "axios";
import { AUTH_TOKEN_NAME } from "../constants/index";
import { getDataFromLocalStorage } from "../utils";

export const backend_URL = process.env.REACT_APP_BASE_URL;
export const frontend_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: backend_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = getDataFromLocalStorage(AUTH_TOKEN_NAME);
    if (token) {
      config.headers["X-CSRFTOKEN"] = token;
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
