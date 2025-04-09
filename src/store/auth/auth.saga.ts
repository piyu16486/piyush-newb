import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  IOtpVerifyResponse,
  ISigninOtpVerifyResponse,
  ISigninResponse,
  ISignupResponse,
  IverifyPasswordResponse,
  OtpVerifyPayload,
  PayloadWithCallback,
  SigninOtpVerifyPayload,
  SignInPayload,
  SignUpPayload,
  VerifyPasswordPayload,
} from './auth.types';
import {AuthApis} from '@services/api';
import {
  otpVerifyRequest,
  signInOtpVerify,
  signinRequest,
  signupRequest,
  verifyPasswordRequest,
} from './auth.slice';
import authApi from '@services/api/auth.api';
import {otpVerifySuccess} from './auth.slice';
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* handleSignup(
  action: PayloadAction<PayloadWithCallback<SignUpPayload>>,
): unknown {
  try {
    const response: ISignupResponse = yield call(
      AuthApis.apiSignup,
      action.payload.payload,
    );
    if (response.success) {
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    action.payload.callbackError?.(error?.message);
  }
}

function* handleOtpVerify(
  action: PayloadAction<PayloadWithCallback<OtpVerifyPayload>>,
): unknown {
  try {
    const response: IOtpVerifyResponse = yield call(
      AuthApis.apiOtpVerify,
      action.payload.payload,
    );

    if (response.statusCode && response.data) {
      const token = response.data;
      console.log('API Response:', response);

      // ✅ Store token in AsyncStorage
      yield call(AsyncStorage.setItem, 'authToken', token);

      // ✅ Dispatch success to slice
      yield put(otpVerifySuccess(token));

      // ✅ Call success callback
      action.payload.callbackSuccess?.();
    } else {
      action.payload.callbackError?.(response.message);
    }
  } catch (error: any) {
    action.payload.callbackError?.(error?.message);
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

export default function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(otpVerifyRequest.type, handleOtpVerify);
  yield takeLatest(verifyPasswordRequest.type, handleVerifyPassword);
  yield takeLatest(signinRequest.type, handleSignin);
  yield takeLatest(signInOtpVerify.type, handleSignInOtpVerify);
}
