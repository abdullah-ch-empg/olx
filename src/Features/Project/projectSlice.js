import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjects } from "../../API/project";
import { PURGE } from "redux-persist";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: null,
  },
  reducers: {
    setProjects: (state, action) => {
      state.value = action.payload;
    },
    resetProjects: (state, action) => {
      state.value = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, (state) => {
        console.log("PURGE STATE +++++++++++++++");
        state.value = null;
      })
      .addCase(getAllProjects.pending, (state, action) => {
        //
        console.log("PENDING");
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        //
        console.log("FULFILLLED");
        state.value = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        //
        console.log("REJECTED", action.error);
      });
  },
});

export const { setProjects, resetProjects } = projectSlice.actions;

// use async thunk here
export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProjects();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const getAllProjects = () => async (dispatch) => {
//   try {
//     const response = await fetchProjects();
//     console.log("response ====> getAllProjects ==> ", response.data.projects);
//     dispatch(setProjects(response.data));
//   } catch (error) {
//     console.log("error ===> getAllProjects ===> ", error);
//   }
// };

export const selectProjects = (state) => state.project.value;

export default projectSlice.reducer;
