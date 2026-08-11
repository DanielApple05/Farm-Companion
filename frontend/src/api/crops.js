import API from "./axios";


export const createCrop = (data) => API.post('/crop', data);
export const getCrops = (data) => API.get('/crop', data);
export const getCropById = (id) => API.get(`/crop/${id}`);
export const deleteCrop = (id) => API.delete(`/crop/${id}`);
export const getSupportedCrops = (data) => API.get('/crop/supported', data);
export const harvestCrop = (id, data) => API.patch(`/crop/${id}/harvest`, data);
