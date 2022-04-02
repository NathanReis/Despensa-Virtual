import axios from 'axios';

let api = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'Accept-Language': 'pt-br' }
});

export default api;
