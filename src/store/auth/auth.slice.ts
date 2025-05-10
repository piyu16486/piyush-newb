import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAuthState,
  UserType,
  SignUpPayloadWithCallback,
  OtpVerifyPayloadWithCallback,
  CreatePasswordPayloadWithCallback,
  ResetLinkPayloadWithCallback,
} from './auth.types';

const initialState: IAuthState = {
  globalLoader: false,
  userType: 'client',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Global Loader
    setGlobalLoader: (state, action: PayloadAction<boolean>) => {
      state.globalLoader = action.payload;
    },
    // User Type
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    // Signup
    signupRequest: (
      state,
      _action: PayloadAction<SignUpPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
    // OTP Verify
    otpVerifyRequest: (
      state,
      _action: PayloadAction<OtpVerifyPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
    // Create New Password
    createNewPassword: (
      state,
      _action: PayloadAction<CreatePasswordPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
    // Send Password Reset Link
    sendResetLinkRequest: (
      state,
      _action: PayloadAction<ResetLinkPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
  },
});

export const {
  setUserType,
  setGlobalLoader,

  signupRequest,
  otpVerifyRequest,
  createNewPassword,
  sendResetLinkRequest,
} = authSlice.actions;
export default authSlice.reducer;
