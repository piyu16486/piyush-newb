import {PayloadWithCallback} from '@type/global.types';

/** Auth State */
export type UserType = 'client' | 'internal';
export interface IAuthState {
  globalLoader: boolean;
  userType: UserType;
}

/** Login  */

export interface LoginPayload {
  username: string;
  password: string;
}

/** SignUp  */
export interface ISignupPayload {
  country_code: string;
  mobile_number: string;
  is_internal?: boolean;
  is_client?: boolean;
  first_name: string;
  last_name: string;
  email: string;
}

export type SignUpPayloadWithCallback = PayloadWithCallback<
  ISignupPayload,
  [],
  [string]
>;

export interface ISignupSuccessResponse {
  message: string;
  success: boolean;
}

export interface ISignupErrorResponse {
  statusCode: number;
  message: string;
}

/** Otp Verify  */
export interface IOtpVerifyPayload {
  email: string;
  otp: string;
}

export type OtpVerifyPayloadWithCallback = PayloadWithCallback<
  IOtpVerifyPayload,
  [],
  [string]
>;

export interface IOtpVerifySuccessResponse {
  statusCode: number;
  message: string;
  data: string;
}

export interface IOtpVerifyErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

/** Create Password */
export interface ICreatePasswordPayload {
  token: string;
  password: string;
}

export type CreatePasswordPayloadWithCallback = PayloadWithCallback<
  ICreatePasswordPayload,
  [string],
  [string]
>;

export interface ICreatePasswordApiResponse {
  statusCode: number;
  message: string;
}

/** Forgot Password */
export interface IResetLinkPayload {
  email: string;
}

export type ResetLinkPayloadWithCallback = PayloadWithCallback<
  IResetLinkPayload,
  [string],
  [string]
>;

export interface IResetLinkSuccessResponse {
  success: boolean;
  message: string;
}

export interface IResetLinkErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

//

export interface VerifyPasswordPayload {
  //email: string;
  token?: string;
  password: string;
}
export interface ISignInPayload {
  email: string;
  password: string;
}

export interface SigninOtpVerifyPayload {
  mobile_number: string;
  otp: string;
}

export interface IverifyPasswordResponse {
  statusCode?: number;
  message: string;
}

export interface ISigninResponse {
  statusCode?: number;
  message: string;
}

export interface ISigninOtpVerifyResponse {
  message: string;
  statusCode?: number;
}
