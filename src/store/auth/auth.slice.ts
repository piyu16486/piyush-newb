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
    passwordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<CreatePasswordPayload>>,
    ) => {},
    verifyPasswordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<VerifyPasswordPayload>>,
    ) => {},
  },
});

export const {signupRequest, passwordRequest, verifyPasswordRequest} =
  authSlice.actions;
export default authSlice.reducer;
