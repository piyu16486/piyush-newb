import {AxiosResponse} from 'axios';
import {tryCatch} from '@utils/TryCatch';
import {Api} from '.';
import Endpoints from '@constants/ApiEndPoints';
// Types
import {
  ForgotPasswordPayload,
  ICreatePasswordApiResponse,
  ICreatePasswordPayload,
  IForgotpasswordResponse,
  IOtpVerifyPayload,
  IOtpVerifySuccessResponse,
  ISigninOtpVerifyResponse,
  ISignInPayload,
  ISigninResponse,
  // Signup
  ISignupPayload,
  ISignupSuccessResponse,
  IverifyPasswordResponse,
  SigninOtpVerifyPayload,
  VerifyPasswordPayload,
} from '@store/auth';

/**
 * Signup API
 */
const apiSignup = async (payload: ISignupPayload) => {
  const {data, error} = await tryCatch<AxiosResponse<ISignupSuccessResponse>>(
    Api.post(Endpoints.apiSignup, payload),
  );
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

/**
 * Verify OTP API
 */
const apiSigninOtpVerify = async (payload: IOtpVerifyPayload) => {
  const {data, error} = await tryCatch<
    AxiosResponse<IOtpVerifySuccessResponse>
  >(Api.post(Endpoints.apiSigninOtpVerify, payload));
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

/**
 * Create Password API
 */
const apiCreatePassword = async (payload: ICreatePasswordPayload) => {
  const {data, error} = await tryCatch<
    AxiosResponse<ICreatePasswordApiResponse>
  >(Api.post(Endpoints.apiCreatePassword, payload));
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return {
    data: data.data,
    error: null,
  };
};

const apiVerifyPassword = async (
  payload: VerifyPasswordPayload,
): Promise<IverifyPasswordResponse> => {
  const response = await Api.post('/auth/create-password', payload);
  return response.data;
};

const apiSignin = async (payload: ISignInPayload): Promise<ISigninResponse> => {
  const response = await Api.post('/auth/login', payload);
  return response.data;
};

const apiOtpVerify = async (
  payload: SigninOtpVerifyPayload,
): Promise<ISigninOtpVerifyResponse> => {
  const response = await Api.post('/auth/verify-otp', payload);
  return response.data;
};

const apiForgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<IForgotpasswordResponse> => {
  const response = await Api.post('/auth/forgot-password', payload);
  return response.data;
};

export default {
  apiSignup,
  apiSigninOtpVerify,
  apiCreatePassword,
  apiOtpVerify,
  apiVerifyPassword,
  apiSignin,
  apiForgotPassword,
};
