import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../API/user";
import { Designation } from "../Features/Designation/Designation";
import { Client } from "../Features/Client/Client";

const cookies = new Cookies();

const Home = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const response = await signOutUser();
      console.log(response.data);
      // clear all cookies
      cookies.remove("uid");
      cookies.remove("access-token");
      cookies.remove("client");
      navigate("/signin");
    } catch (error) {
      console.log("error ===> ", error);
      alert(error?.response?.data?.errors[0]);
    }
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={signOut}>Sign-out</button>
      <Client />
      <Designation />
    </div>
  );
};

export default Home;
