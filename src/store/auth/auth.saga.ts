import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthApis} from '@services/api';
import {Result} from '@utils/TryCatch';
import {AxiosError} from 'axios';
// Types
import {
  ISignupErrorResponse,
  ISignupSuccessResponse,
  IOtpVerifySuccessResponse,
  IOtpVerifyErrorResponse,
  ICreatePasswordApiResponse,
  SignupPayloadWithCallback,
  OtpVerifyPayloadWithCallback,
  CreatePasswordPayloadWithCallback,
  ResetLinkPayloadWithCallback,
  IResetLinkSuccessResponse,
  ISigninSuccessResponse,
  ISigninErrorResponse,
  SigninPayloadWithCallback,
} from './auth.types';
// Slice
import {
  otpVerifyRequest,
  signupRequest,
  createNewPassword,
  setGlobalLoader,
  sendResetLinkRequest,
  resetPassword,
  signinRequest,
} from './auth.slice';

function* handleSignup(
  action: PayloadAction<SignupPayloadWithCallback>,
): unknown {
  const {
    error,
  }: Result<
    ISignupSuccessResponse,
    AxiosError<ISignupErrorResponse>
  > = yield call(AuthApis.apiSignup, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.();
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

function* handleOtpVerify(
  action: PayloadAction<OtpVerifyPayloadWithCallback>,
): unknown {
  const {
    data,
    error,
  }: Result<
    IOtpVerifySuccessResponse,
    AxiosError<IOtpVerifyErrorResponse>
  > = yield call(AuthApis.apiSigninOtpVerify, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.(data.data);
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

function* handleCreateNewPassword(
  action: PayloadAction<CreatePasswordPayloadWithCallback>,
): unknown {
  const {
    data,
    error,
  }: Result<
    ICreatePasswordApiResponse,
    AxiosError<ICreatePasswordApiResponse>
  > = yield call(AuthApis.apiCreatePassword, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.(data.message);
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

function* handleSendResetLink(
  action: PayloadAction<ResetLinkPayloadWithCallback>,
): unknown {
  const {
    data,
    error,
  }: Result<
    IResetLinkSuccessResponse,
    AxiosError<IResetLinkSuccessResponse>
  > = yield call(AuthApis.apiSendResetLink, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.(data.message);
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

function* handleResetPassword(
  action: PayloadAction<CreatePasswordPayloadWithCallback>,
): unknown {
  const {
    data,
    error,
  }: Result<
    ICreatePasswordApiResponse,
    AxiosError<ICreatePasswordApiResponse>
  > = yield call(AuthApis.apiResetPassword, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.(data.message);
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

function* handleSignin(
  action: PayloadAction<SigninPayloadWithCallback>,
): unknown {
  const {
    error,
  }: Result<
    ISigninSuccessResponse,
    AxiosError<ISigninErrorResponse>
  > = yield call(AuthApis.apiSignin, action.payload.payload);
  yield put(setGlobalLoader(false));
  if (!error) {
    action.payload.callbackSuccess?.();
  } else {
    const errorMessage = error.response?.data.message ?? 'Something went wrong';
    action.payload.callbackError?.(errorMessage);
  }
}

// function* handleSignInOtpVerify(
//   action: PayloadAction<PayloadWithCallback<SigninOtpVerifyPayload>>,
// ): unknown {
//   try {
//     const response: ISigninOtpVerifyResponse = yield call(
//       authApi.apiSigninOtpVerify,
//       action.payload.payload,
//     );
//     if (response.message) {
//       action.payload.callbackSuccess?.();
//     } else {
//       action.payload.callbackError?.(response.message);
//     }
//   } catch (error: any) {
//     action.payload.callbackError?.(error?.message);
//   }
// }

export default function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(otpVerifyRequest.type, handleOtpVerify);
  yield takeLatest(createNewPassword.type, handleCreateNewPassword);
  yield takeLatest(sendResetLinkRequest.type, handleSendResetLink);
  yield takeLatest(resetPassword.type, handleResetPassword);
  yield takeLatest(signinRequest.type, handleSignin);
}
