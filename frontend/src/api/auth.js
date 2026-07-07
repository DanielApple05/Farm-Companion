import API from './axios';

export const registerRequest = (data) => API.post('/auth/register', data);
export const loginRequest = (data) => API.post('/auth/login', data);