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
