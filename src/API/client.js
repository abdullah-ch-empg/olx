import axios from "./index";

export const fetchClients = () => axios.get("/polaris/api/clients");
