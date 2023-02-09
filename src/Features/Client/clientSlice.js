import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchClients } from "../../API/client";
import { PURGE } from "redux-persist";

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    setClients: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = true;
      })
      .addCase(getClients.rejected, (state, action) => {
        // error handling here ===>
        console.log("error ===> getClients.rejected ===>", action);
        state.loading = false;
        alert(action.payload.response?.data?.errors[0]);
      })
      .addCase(getClients.pending, (state, action) => {
        state.loading = false;
      })
      .addCase(PURGE, (state) => {
        state.value = null;
      });
  },
});

export const { setClients } = clientSlice.actions;

// export const getClients = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetchClients();
//       dispatch(setClients(response.data));
//     } catch (error) {
//       console.log("error ==> getClients ==>", error);
//       alert(error?.response?.data?.errors[0]);
//     }
//   };
// };

export const getClients = createAsyncThunk("client/fetchClients", async () => {
  try {
    const response = await fetchClients();
    return response.data;
  } catch (error) {
    return error;
  }
});

export const selectClients = (state) => state.clients.entities;
export const selectClientsLoading = (state) => state.clients.loading;

export default clientSlice.reducer;
