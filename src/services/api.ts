import axios from 'axios';

let api = axios.create({
  baseURL: process.env.API_URL
});

export default api;
