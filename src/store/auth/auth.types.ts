export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignUpPayload {
  country_code: string;
  mobile_number: string;
  is_internal: boolean;
  is_client: boolean;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
