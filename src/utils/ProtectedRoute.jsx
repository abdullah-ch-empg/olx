import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const isUserSignedIn = () => {
  let uid = cookies.get("uid");
  let accessToken = cookies.get("access-token");
  let client = cookies.get("client");

  return uid && accessToken && client ? true : false;
};

function Protected({ children }) {
  const isSignedIn = isUserSignedIn();
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}
export default Protected;
