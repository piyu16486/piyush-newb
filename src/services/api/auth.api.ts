import {Api} from '.';
import {
  CreatePasswordPayload,
  ICreatedPasswordResponse,
  ISignupResponse,
  SignUpPayload,
} from '@store/auth';

const apiSignup = async (payload: SignUpPayload): Promise<ISignupResponse> => {
  const response = await Api.post('/auth/signup', payload);
  return response.data;
};

const apiCreatePassword = async (
  payload: CreatePasswordPayload,
): Promise<ICreatedPasswordResponse> => {
  const response = await Api.post('/auth/verify-otp-from-email', payload);
  return response.data;
};

export default {
  apiSignup,
  apiCreatePassword,
};
