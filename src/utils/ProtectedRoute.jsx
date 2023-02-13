import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "universal-cookie";
import { Layout } from "../Layout/Header";
import { useSelector } from "react-redux";
import { selectUserLoginState } from "../Features/User/userSlice";

// const cookies = new Cookies();

// const isUserSignedIn = () => {
//   let uid = cookies.get("uid");
//   let accessToken = cookies.get("access-token");
//   let client = cookies.get("client");

//   return uid && accessToken && client ? true : false;
// };

function Protected() {
  // const isSignedIn = isUserSignedIn();
  const isSignedIn = useSelector(selectUserLoginState);
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
export default Protected;
