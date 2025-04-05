import {Api} from '.';
import {ISignupResponse, SignUpPayload} from '@store/auth';

const apiSignup = async (payload: SignUpPayload): Promise<ISignupResponse> => {
  const response = await Api.post('/auth/signup', payload);
  return response.data;
};

export default {
  apiSignup,
};
