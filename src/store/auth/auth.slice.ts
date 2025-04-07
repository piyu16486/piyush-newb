/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AuthState,
  CreatePasswordPayload,
  PayloadWithCallback,
  SignUpPayload,
} from './auth.types';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<SignUpPayload>>,
    ) => {},
  },
});

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    passwordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<CreatePasswordPayload>>,
    ) => {},
  },
});

export const {signupRequest} = authSlice.actions;
export const {passwordRequest} = passwordSlice.actions;
export default authSlice.reducer;
