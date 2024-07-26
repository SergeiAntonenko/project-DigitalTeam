import axios from 'axios';

axios.defaults.withCredentials = true;

class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://project-digitalteam-backend.onrender.com',
    });
  }

  setAuthHeader(token) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthHeader() {
    delete this.instance.defaults.headers.common.Authorization;
  }
}

export const api = new Api();
