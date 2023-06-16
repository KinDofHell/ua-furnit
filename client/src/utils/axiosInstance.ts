import axios from "axios";

const instance = axios.create({
  // baseURL: "https://ua-furnit-api.vercel.app/",
  // withCredentials: true,
  baseURL: "http://localhost:3000/",
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
