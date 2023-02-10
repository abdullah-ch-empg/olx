import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../API/user";
import { useDispatch } from "react-redux";
import { setLogIn } from "../Features/User/userSlice";
const cookies = new Cookies();

const isUserSignedIn = () => {
  let uid = cookies.get("uid");
  let accessToken = cookies.get("access-token");
  let client = cookies.get("client");

  return uid && accessToken && client ? true : false;
};

const Login = () => {
  const dispatch = useDispatch();
  const isSignedIn = isUserSignedIn();

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async () => {
    try {
      const response = await signInUser(
        credentials.email,
        credentials.password
      );
      console.log("response ===> sigin ==> ", response.headers);

      dispatch(setLogIn(true));
      // set cookies
      cookies.set("access-token", response.headers["access-token"], {
        path: "/",
      });
      cookies.set("client", response.headers["client"], { path: "/" });
      cookies.set("uid", response.headers["uid"], { path: "/" });

      // redirect to home
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
        type={"password"}
      />
      <button onClick={handleLogin}> Log In</button>
    </div>
  );
};

export default Login;
