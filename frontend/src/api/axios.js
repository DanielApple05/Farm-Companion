import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({ baseURL });

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;