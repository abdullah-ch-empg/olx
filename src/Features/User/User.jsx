import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, selectUser } from "./userSlice";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const apiCallRef = useRef(false);

  //   console.log("user information ===> ", user);

  useEffect(() => {
    const getUser = () => {
      apiCallRef.current = true;
      dispatch(getCurrentUser());
    };
    if (!apiCallRef.current && !user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {user ? (
        <>
          <h1>Email : {user.email}</h1>
          <h1>Full Name : {user.full_name}</h1>
          <h1>Primary Contact : {user.primary_contact}</h1>
        </>
      ) : (
        "Loading.........."
      )}
    </div>
  );
};

export default User;
