import axios from 'axios';

let ocr = axios.create({
  baseURL: process.env.OCR_URL,
  headers: { 'Accept-Language': 'pt-br' }
});

export default ocr;
