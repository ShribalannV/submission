import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxied by webpack dev server
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// simple 401 -> try refresh once
let refreshing = null;
api.interceptors.response.use(null, async (error) => {
  const original = error.config;
  if (error.response?.status === 401 && !original._retry) {
    original._retry = true;
    if (!refreshing) {
      refreshing = api.post('/auth/refresh', { refreshToken: localStorage.getItem('refreshToken') })
        .then(r => {
          localStorage.setItem('accessToken', r.data.accessToken);
          refreshing = null;
          return r.data.accessToken;
        })
        .catch(err => { refreshing = null; throw err; });
    }
    const newToken = await refreshing;
    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  }
  throw error;
});

export default api;
