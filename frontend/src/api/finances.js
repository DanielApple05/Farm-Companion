import API from "./axios";

export const getExpenses = (farmId) => API.get(`/expenses?farmId=${farmId}`);
export const addExpense = (data) => API.post("/expenses", data);
export const updateExpense = (id, data) => API.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export const getSales = (farmId) => API.get(`/sales?farmId=${farmId}`);
export const addSale = (data) => API.post("/sales", data);
export const updateSale = (id, data) => API.put(`/sales/${id}`, data);
export const deleteSale = (id) => API.delete(`/sales/${id}`);