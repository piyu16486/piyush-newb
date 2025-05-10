import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {AuthApis} from '@services/api';
import {Result} from '@utils/TryCatch';
import {setStorage} from '@services/localStorage';
import StorageKeys from '@constants/StorageKeys';
import {AxiosError} from 'axios';
// Types
import {
  ISignupErrorResponse,
  ISignupSuccessResponse,
  IOtpVerifySuccessResponse,
  IOtpVerifyErrorResponse,
  ICreatePasswordApiResponse,
  SignUpPayloadWithCallback,
  OtpVerifyPayloadWithCallback,
  CreatePasswordPayloadWithCallback,
  ResetLinkPayloadWithCallback,
  IResetLinkSuccessResponse,
} from './auth.types';
// Slice
import {
  otpVerifyRequest,
  signupRequest,
  createNewPassword,
  setGlobalLoader,
  sendResetLinkRequest,
} from './auth.slice';

function* handleSignup(
  action: PayloadAction<SignUpPayloadWithCallback>,
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
    setStorage(StorageKeys.TOKEN, data.data);
    action.payload.callbackSuccess?.();
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

// function* handleSignin(
//   action: PayloadAction<PayloadWithCallback<SignInPayload>>,
// ): unknown {
//   try {
//     const response: ISigninResponse = yield call(
//       AuthApis.apiSignin,
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

// function* handleForgotPassword(
//   action: PayloadAction<PayloadWithCallback<ForgotPasswordPayload>>,
// ): unknown {
//   try {
//     const response: IForgotpasswordResponse = yield call(
//       authApi.apiForgotPassword,
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
}
