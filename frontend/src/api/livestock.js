import API from "./axios";

export const createLivestock = (data) => API.post('/livestock', data);
export const getLivestock = (data) => API.get('/livestock', data);
export const getLivestockById = (id) => API.get(`/livestock/${id}`);
export const addVaccination = (id, data) => API.post(`/livestock/${id}/vaccinations`, data );