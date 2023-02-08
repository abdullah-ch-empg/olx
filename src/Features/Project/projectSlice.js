import { createSlice } from "@reduxjs/toolkit";
import { createProject, fetchProjects } from "../../API/project";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: [],
  },
  reducers: {
    pushToProjects: (state, action) => {
      state.value.push(action.payload);
    },
    setProjects: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { pushToProjects, setProjects } = projectSlice.actions;

export const createNewProject = (projectData) => async (dispatch) => {
  try {
    const response = await createProject(projectData);
    console.log("response ====> createNewProject ==> ", response.data.project);
    // since we'll always make the get listing API call on mount
    // dispatch(pushToProjects(response.data.project));
    return true;
  } catch (error) {
    console.log("error ===> createNewProject ===> ", error);
    alert(error.response.data.errors);
  }
};
export const getAllProjects = () => async (dispatch) => {
  try {
    const response = await fetchProjects();
    console.log("response ====> getAllProjects ==> ", response.data.projects);
    dispatch(setProjects(response.data));
  } catch (error) {
    console.log("error ===> getAllProjects ===> ", error);
  }
};

export const selectProjects = (state) => state.project.value;

export default projectSlice.reducer;
