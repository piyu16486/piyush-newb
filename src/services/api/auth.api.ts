/* eslint-disable @typescript-eslint/no-unused-vars */
import {Api} from '.';
import {IUser, LoginPayload, SignUpPayload} from '@store/auth';

const apiLogin = async (payload: SignUpPayload): Promise<IUser> => {
  const response = await Api.post('/user/login', payload);
  return response.data;
};

export default {
  apiLogin,
};
