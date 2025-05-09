import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthApis} from '@services/api';
import {Result} from '@utils/TryCatch';
// Types
import {
  ForgotPasswordPayload,
  IForgotpasswordResponse,
  ISigninOtpVerifyResponse,
  ISigninResponse,
  ISignupErrorResponse,
  ISignupSuccessResponse,
  IOtpVerifyPayload,
  PayloadWithCallback,
  SigninOtpVerifyPayload,
  ISignupPayload,
  IOtpVerifySuccessResponse,
  IOtpVerifyErrorResponse,
  ICreatePasswordPayload,
  ICreatePasswordApiResponse,
} from './auth.types';
// Slice
import {
  forgotPassword,
  otpVerifyRequest,
  signInOtpVerify,
  signinRequest,
  signupRequest,
  otpVerifySuccess,
  otpVerifyError,
  signupSuccess,
  signupError,
  createNewPassword,
  createPasswordSuccess,
  createPasswordError,
} from './auth.slice';
import {setStorage} from '@services/localStorage';
import StorageKeys from '@constants/StorageKeys';
import {AxiosError} from 'axios';

function* handleSignup(action: PayloadAction<ISignupPayload>): unknown {
  const {
    data,
    error,
  }: Result<
    ISignupSuccessResponse,
    AxiosError<ISignupErrorResponse>
  > = yield call(AuthApis.apiSignup, action.payload);
  if (!error) {
    yield put(signupSuccess(data.message));
  } else {
    yield put(
      signupError(error.response?.data.message ?? 'Something went wrong'),
    );
  }
}

function* handleOtpVerify(action: PayloadAction<IOtpVerifyPayload>): unknown {
  const {
    data,
    error,
  }: Result<
    IOtpVerifySuccessResponse,
    AxiosError<IOtpVerifyErrorResponse>
  > = yield call(AuthApis.apiSigninOtpVerify, action.payload);
  if (!error) {
    setStorage(StorageKeys.TOKEN, data.data);
    yield put(otpVerifySuccess(data.message));
  } else {
    yield put(
      otpVerifyError(error.response?.data.message ?? 'Something went wrong'),
    );
  }
}

function* handleCreateNewPassword(
  action: PayloadAction<ICreatePasswordPayload>,
): unknown {
  const {
    data,
    error,
  }: Result<
    ICreatePasswordApiResponse,
    AxiosError<ICreatePasswordApiResponse>
  > = yield call(AuthApis.apiCreatePassword, action.payload);
  if (!error) {
    yield put(createPasswordSuccess(data.message));
  } else {
    yield put(
      createPasswordError(
        error.response?.data.message ?? 'Something went wrong',
      ),
    );
  }
}

function* handleSignin(
  action: PayloadAction<PayloadWithCallback<SignInPayload>>,
): unknown {
  try {
    const response: ISigninResponse = yield call(
      AuthApis.apiSignin,
      action.payload.payload,
    );
    if (response.message) {
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    action.payload.callbackError?.(error?.message);
  }
}

function* handleSignInOtpVerify(
  action: PayloadAction<PayloadWithCallback<SigninOtpVerifyPayload>>,
): unknown {
  try {
    const response: ISigninOtpVerifyResponse = yield call(
      authApi.apiSigninOtpVerify,
      action.payload.payload,
    );
    if (response.message) {
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    action.payload.callbackError?.(error?.message);
  }
}

function* handleForgotPassword(
  action: PayloadAction<PayloadWithCallback<ForgotPasswordPayload>>,
): unknown {
  try {
    const response: IForgotpasswordResponse = yield call(
      authApi.apiForgotPassword,
      action.payload.payload,
    );
    if (response.message) {
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    action.payload.callbackError?.(error?.message);
  }
}

export default function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(otpVerifyRequest.type, handleOtpVerify);
  yield takeLatest(createNewPassword.type, handleCreateNewPassword);
  yield takeLatest(signinRequest.type, handleSignin);
  yield takeLatest(signInOtpVerify.type, handleSignInOtpVerify);
  yield takeLatest(forgotPassword.type, handleForgotPassword);
}
