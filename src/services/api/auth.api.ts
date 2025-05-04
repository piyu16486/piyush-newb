import {Result} from '@utils/TryCatch';
import {Api} from '.';
import {responseHandler} from './responseHandler';
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
  ISignupErrorResponse,
  ISignupPayload,
  ISignupSuccessResponse,
  IverifyPasswordResponse,
  SigninOtpVerifyPayload,
  VerifyPasswordPayload,
} from '@store/auth';

/**
 * Sends a signup request to the server.
 * @param {ISignupPayload} payload - The payload containing signup details such as email, name, and mobile number.
 * @returns {Promise<Result<ISignupSuccessResponse, ISignupErrorResponse>>} The result of the signup operation, containing either the success response or an error response.
 */

const apiSignup = async (
  payload: ISignupPayload,
): Promise<Result<ISignupSuccessResponse, ISignupErrorResponse>> => {
  const resultSet = await responseHandler<
    ISignupSuccessResponse,
    ISignupErrorResponse
  >(Api.post('/auth/signup', payload));
  return resultSet;
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
