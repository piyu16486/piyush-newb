
export type UserType = 'client' | 'internal';
export interface IAuthState {
  signupLoader: boolean;
  signupError: string | null | undefined;
  signupSuccess: string | null;

  verifyOtpLoader: boolean;
  verifyOtpError: string | null | undefined;
  verifyOtpSuccess: string | null;
  userType: UserType;
}

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

export interface ForgotPasswordPayload {
  email: string;
}

export interface PayloadWithCallback<T> {
  payload: T;
  callback?: (...args: any[]) => void;
  callbackError?: (...args: any[]) => void;
  callbackSuccess?: (...args: any[]) => void;
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

export interface IForgotpasswordResponse {
  success?: boolean;
  message: string;
}
