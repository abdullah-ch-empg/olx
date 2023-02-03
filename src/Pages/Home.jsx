import React, { useEffect, useRef, useState } from "react";
import axios from "../axiosConfig";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Home = () => {
  const navigate = useNavigate();
  const apiCallRef = useRef(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        apiCallRef.current = true;
        const response = await axios.get("users/current");
        setUserInfo(response.data);
      } catch (error) {
        console.log("error ===> ", error);
        alert(error?.response?.data?.errors[0]);
      }
    };

    if (!apiCallRef.current) {
      getCurrentUser();
    }
  }, []);

  const signOut = async () => {
    try {
      const response = await axios.delete("auth/sign_out");
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
      {userInfo?.user ? (
        <ul>
          {userInfo.user?.designations.map((designation) => (
            <li key={designation.id}>{designation.name}</li>
          ))}
        </ul>
      ) : (
        <h1>Loading...........</h1>
      )}
    </div>
  );
};

export default Home;
