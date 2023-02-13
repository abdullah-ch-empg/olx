import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "../Layout/Header";
import { useSelector } from "react-redux";
import { selectUserLoginState } from "../Features/User/userSlice";

function Protected() {
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
