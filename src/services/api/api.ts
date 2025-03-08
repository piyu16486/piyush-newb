import {Config} from '@config/index';
import axios from 'axios';

const GENERAL_TIMEOUT = 15000;

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: GENERAL_TIMEOUT,
});

export default axiosInstance;
