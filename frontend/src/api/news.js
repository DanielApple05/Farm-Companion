import API from "./axios";

// NewsData.io: filtered by "agriculture" keyword + Nigeria as the country.
// Your backend route should proxy this call so your NewsData.io API key
// stays server-side, never exposed in frontend code.
export const getAgricultureNews = () => API.get("/news/agriculture");