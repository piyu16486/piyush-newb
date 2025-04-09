/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  OtpVerifyPayload,
  PayloadWithCallback,
  SigninOtpVerifyPayload,
  SignInPayload,
  SignUpPayload,
  VerifyPasswordPayload,
} from './auth.types';
import {State} from 'react-native-gesture-handler';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<SignUpPayload>>,
    ) => {},
    otpVerifyRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<OtpVerifyPayload>>,
    ) => {},
    otpVerifySuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    verifyPasswordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<VerifyPasswordPayload>>,
    ) => {},
    signinRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<SignInPayload>>,
    ) => {},
    signInOtpVerify: (
      state,
      action: PayloadAction<PayloadWithCallback<SigninOtpVerifyPayload>>,
    ) => {},
  },
});

export const {
  signupRequest,
  otpVerifyRequest,
  otpVerifySuccess,
  verifyPasswordRequest,
  signinRequest,
  signInOtpVerify,
} = authSlice.actions;
export default authSlice.reducer;
