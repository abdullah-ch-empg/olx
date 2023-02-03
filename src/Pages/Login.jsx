import React, { useState } from "react";
import axios from "../axiosConfig";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const login = async () => {
    try {
      const response = await axios.post(`auth/sign_in`, {
        email: credentials.email,
        password: credentials.password,
      });
      console.log("response ===> sigin ==> ", response.headers);

      // set cookies
      cookies.set("access-token", response.headers["access-token"], {
        path: "/",
      });
      cookies.set("client", response.headers["client"], { path: "/" });
      cookies.set("uid", response.headers["uid"], { path: "/" });

      // redirect to home
      window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.log("error ==> ", error);
      alert(error?.response?.data?.errors[0]);
    }
  };

  const handleCredentials = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setCredentials((prevState) => {
        return { ...prevState, email: value };
      });
    } else if (name === "password") {
      setCredentials((prevState) => {
        return { ...prevState, password: value };
      });
    }
    console.log("credentials are ====> ", credentials);
    // console.log("env ===> ", process.env.REACT_APP_API);
  };

  const handleLogin = () => {
    if (!credentials.email) {
      return alert("Please enter an Email !");
    }
    if (!credentials.password) {
      return alert("Please enter a Password!");
    }

    // make the login API call here
    login();
  };
  return (
    <div>
      <input onChange={handleCredentials} name="email" placeholder="email" />
      <input
        onChange={handleCredentials}
        name="password"
        placeholder="Password"
      />
      <button onClick={handleLogin}> Log In</button>
    </div>
  );
};

export default Login;
