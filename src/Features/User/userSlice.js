import { createSlice } from "@reduxjs/toolkit";
import { getUser, signOutUser } from "../../API/user";
import { removeCookies } from "../../utils";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await getUser();
      console.log("user data ====> ", response.data.user);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log("error ==> getCurrentUser ==>", error);
      //   alert(error?.response?.data?.errors[0]);
    }
  };
};
export const logOutUser = () => {
  return async (dispatch) => {
    try {
      const response = await signOutUser();
      console.log("Response ===> logOutUser", response.data);
      // purge any persisted State
      //   purgePersistance();
      //   console.log("purge ===> ", persistor);
      // remove all cookies
      removeCookies();
      window.location.href = "/signin";
    } catch (error) {
      console.log("error ==> getCurrentUser ==>", error);
      alert(error?.response?.data?.errors[0]);
    }
  };
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.designation.value)`
export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
