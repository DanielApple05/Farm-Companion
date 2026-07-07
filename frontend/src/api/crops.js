import API from "./axios";

export const updateCrop = (data) => API.post('/cropRoute/createCrop', data);