import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { persistor } from "../App/store";

import User from "../Features/User/User";
import { logOutUser } from "../Features/User/userSlice";
// import { Designation } from "../Features/Designation/Designation";
// import { Client } from "../Features/Client/Client";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logOutUser());
      await persistor.purge();
    } catch (error) {
      console.log("error ===> ", error);
      alert(error?.response?.data?.errors[0]);
    }
  };

  const routeToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={routeToDashboard}>Dashboard</button>

      <button onClick={signOut}>Sign-out</button>
      <User />
      {/* <Client /> */}
      {/* <Designation /> */}
    </div>
  );
};

export default Home;
