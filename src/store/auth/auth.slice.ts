/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  AuthState,
  CreatePasswordPayload,
  PayloadWithCallback,
  SignUpPayload,
  VerifyPasswordPayload,
} from './auth.types';
import {State} from 'react-native-gesture-handler';

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

const verifyPasswordSlice = createSlice({
  name: 'verifyPassword',
  initialState,
  reducers: {
    verifypasswordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<VerifyPasswordPayload>>,
    ) => {},
  },
});

export const {signupRequest} = authSlice.actions;
export const {passwordRequest} = passwordSlice.actions;
export const {verifypasswordRequest} = verifyPasswordSlice.actions;
export default authSlice.reducer;
