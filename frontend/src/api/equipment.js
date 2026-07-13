import API from "./axios";

export const addEquipment = (farmId, data) =>
  API.post(`/farms/${farmId}/equipment`, data);