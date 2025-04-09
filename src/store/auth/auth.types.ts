export interface AuthState {
  user: ISignupResponse | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignUpPayload {
  country_code: string;
  mobile_number: string;
  is_internal?: boolean;
  is_client?: boolean;
  first_name: string;
  last_name: string;
  email: string;
}
export interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export interface VerifyPasswordPayload {
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SigninOtpVerifyPayload {}

export interface PayloadWithCallback<T> {
  payload: T;
  callback?: (...args: any[]) => void;
  callbackError?: (...args: any[]) => void;
  callbackSuccess?: (...args: any[]) => void;
}

export interface ISignupResponse {
  statusCode?: number;
  message: string;
  success?: boolean;
}

export interface IOtpVerifyResponse {
  statusCode?: number;
  message: string;
  data: string;
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
