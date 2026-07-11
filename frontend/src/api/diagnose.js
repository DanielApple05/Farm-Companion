import API from "./axios";

export const diagnoseCrop = (data) => API.post('/diagnose', data);