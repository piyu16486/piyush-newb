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
  VerifyPasswordPayload,
} from './auth.types';

const initialState: IAuthState = {
  signupError: null,
  signupLoader: false,
  signupSuccess: null,

  verifyOtpLoader: false,
  verifyOtpError: null,
  verifyOtpSuccess: null,

  userType: 'client',
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
      state.signupLoader = true;
    },
    signupSuccess: (state, action: PayloadAction<string | null>) => {
      state.signupSuccess = action.payload;
      state.signupLoader = false;
    },
    signupError: (state, action: PayloadAction<string | undefined | null>) => {
      state.signupError = action.payload;
      state.signupLoader = false;
    },
    // OTP Verify
    otpVerifyRequest: (state, _action: PayloadAction<IOtpVerifyPayload>) => {
      state.verifyOtpLoader = true;
    },
    otpVerifySuccess: (state, action: PayloadAction<string>) => {
      state.verifyOtpSuccess = action.payload;
      state.verifyOtpLoader = false;
    },
    otpVerifyError: (state, action: PayloadAction<string | undefined>) => {
      state.verifyOtpError = action.payload;
      state.verifyOtpLoader = false;
    },

    verifyPasswordRequest: (
      state,
      action: PayloadAction<PayloadWithCallback<VerifyPasswordPayload>>,
    ) => {},
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
  verifyPasswordRequest,
  signinRequest,
  signInOtpVerify,
  forgotPassword,
  setUserType,
} = authSlice.actions;
export default authSlice.reducer;
