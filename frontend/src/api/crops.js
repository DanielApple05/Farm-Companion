import API from "./axios";


export const createCrop = (data) => API.post('/crop', data);
export const getCrops = (data) => API.get('/crop', data);
export const getCropById = (id) => API.get(`/crop/${id}`);
export const deleteCrop = (id) => API.delete(`/crop/${id}`);
