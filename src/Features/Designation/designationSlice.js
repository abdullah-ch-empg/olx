import { createSlice, current } from "@reduxjs/toolkit";
import { getUser } from "../../API/user";

export const designationSlice = createSlice({
  name: "designation",
  initialState: {
    value: null,
  },
  reducers: {
    setDesignations: (state, action) => {
      state.value = action.payload;
    },
    deleteDesignation: (state, action) => {
      const index = state.value.findIndex(
        (designation) => designation.id === action.payload
      );

      if (index > -1) {
        console.log("Index found ===> ", index);
        console.log(
          "following designation is going to be delete ===> ",
          current(state.value[index])
        );
        state.value.splice(index, 1);
      }
    },
  },
});

export const { setDesignations, deleteDesignation } = designationSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch

export const getDesignationsUser = () => {
  return async (dispatch) => {
    try {
      const response = await getUser();
      dispatch(setDesignations(response.data.user.designations));
    } catch (error) {
      console.log("error ==> getDesignationsUser ==>", error);
      alert(error?.response?.data?.errors[0]);
    }
  };
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.designation.value)`
export const selectDesignation = (state) => state.designation.value;

export default designationSlice.reducer;
