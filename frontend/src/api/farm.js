import API from "./axios";

export const addFarm = (data) => API.post('/farmRoutes/createFarm', data);