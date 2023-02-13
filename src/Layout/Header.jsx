import React from "react";
import { Header } from "../Components/Header";
// import { useSelector } from "react-redux";
// import { selectUserLoginState } from "../Features/User/userSlice";

export const Layout = ({ children }) => {
  // const isSignIn = useSelector(selectUserLoginState);

  return (
    <>
      {/* {isSignIn ? <Header /> : null} */}
      <Header />
      <main>{children}</main>
    </>
  );
};
