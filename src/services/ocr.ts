import axios from 'axios';

let ocr = axios.create({
  baseURL: process.env.OCR_URL
});

export default ocr;
