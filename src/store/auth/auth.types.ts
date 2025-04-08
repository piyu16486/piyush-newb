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
export interface CreatePasswordPayload {
  email: string;
  otp: string;
}

export interface VerifyPasswordPayload {
  email: String;
  password: String;
}

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

export interface ICreatedPasswordResponse {
  statusCode?: number;
  message: string;
}

export interface IverifyPasswordResponse {
  statusCode?: number;
  message: string;
}
