import API from './axios';

export const useRegister = (data) => API.post('/auth/register', data);
export const useLogin = (data) => API.post('/auth/login', data);