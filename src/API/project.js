import axios from "./index";

export const fetchNewProject = () => axios.get("/api/polaris/projects/new");

export const fetchProvinces = (countryId) =>
  axios.get(`api/states?q[country_id_eq]=${countryId}`);

export const fetchCities = (countryId) =>
  axios.get(`api/cities?q[country_id_eq]=${countryId}?page=1`);

export const createProject = (projectData) =>
  axios.post("/api/polaris/projects", {
    project: projectData,
  });
