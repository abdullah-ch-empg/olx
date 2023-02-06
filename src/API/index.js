import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.interceptors.request.use((config) => {
  // don't need to send cookies for sign_in API
  if (config.url === "auth/sign_in") {
    return config;
  }
  config.headers["uid"] = cookies.get("uid");
  config.headers["access-token"] = cookies.get("access-token");
  config.headers["client"] = cookies.get("client");

  return config;
});

// logout on 401
export default instance;
