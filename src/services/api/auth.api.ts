import {Api} from '.';
import {
  ForgotPasswordPayload,
  IForgotpasswordResponse,
  IOtpVerifyResponse,
  ISigninOtpVerifyResponse,
  ISigninResponse,
  ISignupResponse,
  IverifyPasswordResponse,
  OtpVerifyPayload,
  SigninOtpVerifyPayload,
  SignInPayload,
  SignUpPayload,
  VerifyPasswordPayload,
} from '@store/auth';

const apiSignup = async (payload: SignUpPayload): Promise<ISignupResponse> => {
  const response = await Api.post('/auth/signup', payload);
  return response.data;
};

const apiOtpVerify = async (
  payload: OtpVerifyPayload,
): Promise<IOtpVerifyResponse> => {
  const response = await Api.post('/auth/verify-otp-from-email', payload);
  return response.data;
};

const apiVerifyPassword = async (
  payload: VerifyPasswordPayload,
): Promise<IverifyPasswordResponse> => {
  const response = await Api.post('/auth/create-password', payload);
  return response.data;
};

const apiSignin = async (payload: SignInPayload): Promise<ISigninResponse> => {
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
