import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAuthState,
  UserType,
  SignupPayloadWithCallback,
  OtpVerifyPayloadWithCallback,
  CreatePasswordPayloadWithCallback,
  ResetLinkPayloadWithCallback,
  SigninPayloadWithCallback,
} from './auth.types';
import {getStorage} from '@services/localStorage';
import StorageKeys from '@constants/StorageKeys';

const initialState: IAuthState = {
  globalLoader: false,
  userType: 'client',
  isLoggedIn: getStorage(StorageKeys.IS_LOGGED_IN, true),
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
    // Is Logged In
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    // Signup
    signupRequest: (
      state,
      _action: PayloadAction<SignupPayloadWithCallback>,
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
    // Reset Password
    resetPassword: (
      state,
      _action: PayloadAction<CreatePasswordPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
    // Signin
    signinRequest: (
      state,
      _action: PayloadAction<SigninPayloadWithCallback>,
    ) => {
      state.globalLoader = true;
    },
  },
});

export const {
  setUserType,
  setGlobalLoader,
  setIsLoggedIn,
  signupRequest,
  otpVerifyRequest,
  createNewPassword,
  sendResetLinkRequest,
  resetPassword,
  signinRequest,
} = authSlice.actions;
export default authSlice.reducer;
