import {Api} from '.';
import {IUser, LoginPayload} from '@store/auth';

const apiLogin = async (payload: LoginPayload): Promise<IUser> => {
  const response = await Api.post('/user/login', payload);
  return response.data;
};

export default {
  apiLogin,
};
