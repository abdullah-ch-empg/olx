import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchNewProject,
  fetchProvinces,
} from "../../API/project";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: null,
    countries: null,
    provinces: null,
    cities: null,
  },
  reducers: {
    setProjectCountries: (state, action) => {
      state.countries = action.payload;
    },
    setProjectProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    setProjectCities: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { setProjectCountries, setProjectProvinces, setProjectCities } =
  projectSlice.actions;

// thunk
export const getNewProject = () => {
  return async (dispatch) => {
    try {
      const response = await fetchNewProject();
      console.log("project data ====> ", response.data);
      dispatch(setProjectCountries(response.data.countries));
    } catch (error) {
      console.log("error ==> getNewProject ==>", error);
      //   alert(error?.response?.data?.errors[0]);
    }
  };
};

export const getProvinces = (countryId) => {
  return async (dispatch) => {
    try {
      const response = await fetchProvinces(countryId);
      console.log("project data ====> ", response.data.states);
      dispatch(setProjectProvinces(response.data.states));
    } catch (error) {
      console.log("error ==> getNewProject ==>", error);
      //   alert(error?.response?.data?.errors[0]);
    }
  };
};

export const getCities = (countryId) => {
  return async (dispatch) => {
    try {
      const response = await fetchCities(countryId);
      console.log("project data ====> ", response.data.cities);
      dispatch(setProjectCities(response.data.cities));
    } catch (error) {
      console.log("error ==> getNewProject ==>", error);
      //   alert(error?.response?.data?.errors[0]);
    }
  };
};
export const selectCountriesProject = (state) => state.project.countries;
export const selectProvincesProject = (state) => state.project.provinces;
export const selectCitiesProject = (state) => state.project.cities;

export default projectSlice.reducer;
