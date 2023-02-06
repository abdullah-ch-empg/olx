import { createSlice } from "@reduxjs/toolkit";
import { fetchClients } from "../../API/client";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    value: null,
  },
  reducers: {
    setClients: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setClients } = clientSlice.actions;

export const getClients = () => {
  return async (dispatch) => {
    try {
      const response = await fetchClients();
      dispatch(setClients(response.data));
    } catch (error) {
      console.log("error ==> getClients ==>", error);
      alert(error?.response?.data?.errors[0]);
    }
  };
};

export const selectClients = (state) => state.clients.value;

export default clientSlice.reducer;
