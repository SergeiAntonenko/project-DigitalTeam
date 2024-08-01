import axios from 'axios';
// import { refreshUser } from '../redux/auth/operations';
// import store from '../redux/store.js';
// import { setToken } from '../redux/auth/slice.js';

axios.defaults.withCredentials = true;

class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://project-digitalteam-backend.onrender.com',
      withCredentials: true,
    });

    //   this.instance.interceptors.response.use(
    //     response => response,
    //     async error => {
    //       const originalRequest = error.config;
    //       if (error.response.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //         try {
    //           const access_token = await refreshUser();

    //           store.dispatch(setToken(access_token));

    //           originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
    //           return this.instance(originalRequest);
    //         } catch (error) {
    //           return Promise.reject(error);
    //         }
    //       }
    //       return Promise.reject(error);
    //     }
    //   );
  }

  setAuthHeader(token) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthHeader() {
    delete this.instance.defaults.headers.common.Authorization;
  }
}

export const api = new Api();
