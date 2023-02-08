import { createSlice } from "@reduxjs/toolkit";
import { createProject } from "../../API/project";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { setProjects } = projectSlice.actions;

export const createNewProject = (projectData) => async (dispatch) => {
  try {
    const response = await createProject(projectData);
    console.log("response ====> createNewProject ==> ", response.data.project);
    dispatch(setProjects(response.data.project));
    return true;
  } catch (error) {
    console.log("error ===> createNewProject ===> ", error);
    alert(error.response.data.errors);
  }
};

export default projectSlice.reducer;
