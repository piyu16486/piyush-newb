import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ForgotPasswordPayload,
  IAuthState,
  IOtpVerifyPayload,
  PayloadWithCallback,
  SigninOtpVerifyPayload,
  ISignInPayload,
  ISignupPayload,
  UserType,
  ICreatePasswordPayload,
} from './auth.types';

const initialState: IAuthState = {
  globalLoader: false,
  userType: 'client',

  signupError: null,
  signupSuccess: null,

  verifyOtpError: null,
  verifyOtpSuccess: null,

  createPasswordError: null,
  createPasswordSuccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // User Type
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    // Signup
    signupRequest: (state, _action: PayloadAction<ISignupPayload>) => {
      state.globalLoader = true;
    },
    signupSuccess: (state, action: PayloadAction<string | null>) => {
      state.signupSuccess = action.payload;
      state.globalLoader = false;
    },
    signupError: (state, action: PayloadAction<string | undefined | null>) => {
      state.signupError = action.payload;
      state.globalLoader = false;
    },
    // OTP Verify
    otpVerifyRequest: (state, _action: PayloadAction<IOtpVerifyPayload>) => {
      state.globalLoader = true;
    },
    otpVerifySuccess: (state, action: PayloadAction<string>) => {
      state.verifyOtpSuccess = action.payload;
      state.globalLoader = false;
    },
    otpVerifyError: (state, action: PayloadAction<string | undefined>) => {
      state.verifyOtpError = action.payload;
      state.globalLoader = false;
    },
    // Create New Password
    createNewPassword: (
      state,
      _action: PayloadAction<ICreatePasswordPayload>,
    ) => {
      state.globalLoader = true;
    },
    createPasswordSuccess: (state, action: PayloadAction<string | null>) => {
      state.createPasswordSuccess = action.payload;
      state.globalLoader = false;
    },
    createPasswordError: (
      state,
      action: PayloadAction<string | undefined | null>,
    ) => {
      state.createPasswordError = action.payload;
      state.globalLoader = false;
    },
    //
    signinRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<ISignInPayload>>,
    ) => {},
    signInOtpVerify: (
      state,
      action: PayloadAction<PayloadWithCallback<SigninOtpVerifyPayload>>,
    ) => {},
    forgotPassword: (
      state,
      action: PayloadAction<PayloadWithCallback<ForgotPasswordPayload>>,
    ) => {},
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupError,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyError,
  createNewPassword,
  createPasswordSuccess,
  createPasswordError,
  signinRequest,
  signInOtpVerify,
  forgotPassword,
  setUserType,
} = authSlice.actions;
export default authSlice.reducer;
