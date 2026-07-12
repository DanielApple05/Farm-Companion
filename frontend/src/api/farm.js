import API from "./axios";

export const addFarm = (data) => API.post('/farms', data);
export const getFarms = (data) => API.get('/farms', data);
export const getFarmById = (id) => API.get(`/farms/${id}`);