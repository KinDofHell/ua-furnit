import axios from "axios";

const instance = axios.create({
  baseURL: "https://ua-furnit-api.vercel.app/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
