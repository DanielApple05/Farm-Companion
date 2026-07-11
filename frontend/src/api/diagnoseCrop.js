import API from "./axios";

export const createDiagnoseCrop = (data) => API.post('/diagnose', data);