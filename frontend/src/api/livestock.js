import API from "./axios";

export const createLivestock = (data) => API.post('/livestock', data);