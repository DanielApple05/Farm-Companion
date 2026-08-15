import API from "./axios";

export const getHistory = (farmId, data) =>
  API.post(`/farms/${farmId}/history`, data);