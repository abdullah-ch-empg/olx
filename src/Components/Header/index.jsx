import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Features/User/userSlice";
import { persistor } from "../../App/store";

/**
 * home page
 * dashboard
 * log out
 *
 */
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHome = () => {
    navigate("/");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleSignOut = async () => {
    try {
      dispatch(logOutUser());
      await persistor.purge();
    } catch (error) {
      console.log("error ===> ", error);
      alert(error?.response?.data?.errors[0]);
    }
  };
  return (
    <header className={`${styles.container}`}>
      <div>
        <span onClick={handleHome} className={`${styles.mr10}`}>
          Home
        </span>
        <span onClick={handleDashboard}>Dashboard</span>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign - Out</button>
      </div>
    </header>
  );
};
