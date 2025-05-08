import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  ForgotPasswordPayload,
  IForgotpasswordResponse,
  ISigninOtpVerifyResponse,
  ISigninResponse,
  ISignupErrorResponse,
  ISignupSuccessResponse,
  IverifyPasswordResponse,
  IOtpVerifyPayload,
  PayloadWithCallback,
  SigninOtpVerifyPayload,
  ISignInPayload,
  ISignupPayload,
  VerifyPasswordPayload,
  IOtpVerifySuccessResponse,
  IOtpVerifyErrorResponse,
} from './auth.types';

import {AuthApis} from '@services/api';
import {
  forgotPassword,
  otpVerifyRequest,
  signInOtpVerify,
  signinRequest,
  signupRequest,
  verifyPasswordRequest,
  otpVerifySuccess,
  otpVerifyError,
  signupSuccess,
  signupError,
} from './auth.slice';
import authApi from '@services/api/auth.api';
import {AxiosError} from 'axios';
import {storage} from '@services/localStorage';
import {StorageKeys} from '@constants/index';
import {Result} from '@utils/TryCatch';

function* handleSignup(action: PayloadAction<ISignupPayload>): unknown {
  const {data, error}: Result<ISignupSuccessResponse, ISignupErrorResponse> =
    yield call(AuthApis.apiSignup, action.payload);
  if (!error) {
    yield put(signupSuccess(data.message));
  } else {
    yield put(signupError(error.message));
  }
}

function* handleOtpVerify(action: PayloadAction<IOtpVerifyPayload>): unknown {
  try {
    const response: IOtpVerifySuccessResponse = yield call(
      AuthApis.apiOtpVerify,
      action.payload,
    );
    if (response.statusCode && response.data) {
      const token = response.data;
      storage.set(StorageKeys.TOKEN, token);
      storage.set(StorageKeys.IS_LOGGED_IN, true);

      yield put(otpVerifySuccess(response.message));
    } else {
      yield put(otpVerifyError(response.message));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<IOtpVerifyErrorResponse>;
      yield put(otpVerifyError(axiosError.response?.data?.message));
    } else {
      yield put(otpVerifyError(JSON.stringify(error)));
    }
  }
}

function* handleVerifyPassword(
  action: PayloadAction<PayloadWithCallback<VerifyPasswordPayload>>,
): unknown {
  try {
    console.log('req:    ', action);
    const response: IverifyPasswordResponse = yield call(
      authApi.apiVerifyPassword,
      action.payload.payload,
    );
    if (response.statusCode) {
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    console.log(error);
    action.payload.callbackError?.(error?.message);
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
  yield takeLatest(verifyPasswordRequest.type, handleVerifyPassword);
  yield takeLatest(signinRequest.type, handleSignin);
  yield takeLatest(signInOtpVerify.type, handleSignInOtpVerify);
  yield takeLatest(forgotPassword.type, handleForgotPassword);
}
