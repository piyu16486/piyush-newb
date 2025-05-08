import {Config} from '@config/index';
import StorageKeys from '@constants/StorageKeys';
import {storage} from '@services/localStorage';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const GENERAL_TIMEOUT = 10000;

const axiosInstance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'x-client-type': 'mobile',
  },
  timeout: GENERAL_TIMEOUT,
});

export type CustomRequestConfig = InternalAxiosRequestConfig & {
  authRequired?: boolean;
  isFormData?: boolean;
  controller?: AbortController;
};

const cancelTokens: Array<AbortController> = [];

/**
 * Request interceptor to add the access token to the authorization header
 * if the authRequired flag is set.
 *
 * @param {CustomRequestConfig} config - The request configuration.
 * @returns {Promise<CustomRequestConfig>} The modified request configuration.
 */
axiosInstance.interceptors.request.use(
  async (config: CustomRequestConfig): Promise<CustomRequestConfig> => {
    const controller = new AbortController();
    config.signal = controller.signal;
    config.controller = controller;
    cancelTokens.push(controller);

    if (config.authRequired) {
      const token = storage.getString(StorageKeys.TOKEN);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.isFormData && config.headers) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    if (!config.isFormData && config.headers) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
);

// Response Interceptor
/**
 * Logs the request and response data to the console.
 *
 * @param {AxiosResponse} response - The response object.
 * @returns {Promise<AxiosResponse>} The response object.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.group('=========== API REQUEST RESPONSE ===========');
    console.log('request: ', response.request.responseURL);
    console.log('response: ', response.data);
    console.groupEnd();
    return response;
  },
  /**
   * Logs the request and error data to the console.
   *
   * @param {AxiosError} error - The error object.
   * @returns {Promise<never>} The error object.
   */
  async (error: AxiosError): Promise<never> => {
    console.group('=========== API REQUEST ERROR ===========');
    console.log('request: ', error.request.responseURL);
    console.log('error: ', error.message);
    console.groupEnd();
    return Promise.reject(error);
  },
);

// TODO: Handle token expiration
/**
 * Cancels all ongoing API requests by aborting them and clears
 * the list of stored cancellation tokens.
 */

export const cancelAllRequests = () => {
  cancelTokens.forEach(controller => controller.abort());
  cancelTokens.length = 0;
};

/**
 * Logs out the user by clearing the access and refresh tokens from storage.
 */

export const logoutUser = () => {};

export default axiosInstance;
