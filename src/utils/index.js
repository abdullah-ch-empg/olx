import Cookies from "universal-cookie";

export const removeCookies = () => {
  const cookies = new Cookies();
  // clear all cookies
  cookies.remove("uid");
  cookies.remove("access-token");
  cookies.remove("client");
};
