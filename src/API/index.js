import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_API,
  // withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers["uid"] = cookies.get("uid");
  config.headers["access-token"] = cookies.get("access-token");
  config.headers["client"] = cookies.get("client");

  return config;
});

export default instance;
