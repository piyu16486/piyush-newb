import {AxiosResponse} from 'axios';
import {tryCatch} from '@utils/TryCatch';
import {Api} from '.';
// Types
import {
  ForgotPasswordPayload,
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
    Api.post('/auth/signup', payload),
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
 * @param {IOtpVerifyPayload} payload - request payload
 * @returns {Promise<IOtpVerifySuccessResponse>} response of API
 */
const apiOtpVerify = async (
  payload: IOtpVerifyPayload,
): Promise<IOtpVerifySuccessResponse> => {
  const response = await Api.post('/auth/verify-otp-from-email', payload);
  return response.data;
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

const apiSigninOtpVerify = async (
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
  apiOtpVerify,
  apiVerifyPassword,
  apiSignin,
  apiSigninOtpVerify,
  apiForgotPassword,
};
