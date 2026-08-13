import API from "./axios";

export const getFarmManagementTips = (data) => API.get('/tips/general', data);