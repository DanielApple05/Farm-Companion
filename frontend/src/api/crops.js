import API from "./axios";

export const updateCrop = (data) => API.post('/crop', data);