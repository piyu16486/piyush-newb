import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';
const GENERAL_TIMEOUT = 15000;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: GENERAL_TIMEOUT,
});

export default axiosInstance;
