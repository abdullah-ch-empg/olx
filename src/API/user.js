import axios from "./index";

export const signInUser = (email, password) =>
  axios.post(`/auth/sign_in`, {
    email: email,
    password: password,
  });

export const getUser = () => axios.get("/api/polaris/users/current");

export const signOutUser = () => axios.delete("auth/sign_out");
