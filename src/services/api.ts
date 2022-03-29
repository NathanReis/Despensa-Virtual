import axios from 'axios';

let api = axios.create({
  baseURL: process.env.API_URL
  // baseURL: 'http://192.168.0.122:3000'
});

export default api;
