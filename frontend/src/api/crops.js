import API from "./axios";


export const createCrop = (data) => API.post('/crop', data);
export const getCrops = (data) => API.post('/crop', data);