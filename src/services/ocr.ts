import axios from 'axios';

const ocr = axios.create({
  baseURL: process.env.OCR_URL
});

export default ocr;
