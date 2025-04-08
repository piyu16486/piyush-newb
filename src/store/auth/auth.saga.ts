import {call, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  CreatePasswordPayload,
  ICreatedPasswordResponse,
  ISignupResponse,
  IverifyPasswordResponse,
  PayloadWithCallback,
  SignUpPayload,
  VerifyPasswordPayload,
} from './auth.types';
import {AuthApis} from '@services/api';
import {
  passwordRequest,
  signupRequest,
  verifypasswordRequest,
} from './auth.slice';
import authApi from '@services/api/auth.api';

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

function* handleCreatePassword(
  action: PayloadAction<PayloadWithCallback<CreatePasswordPayload>>,
): unknown {
  try {
    const response: ICreatedPasswordResponse = yield call(
      AuthApis.apiCreatePassword,
      action.payload.payload,
    );
    if (response.statusCode) {
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
    action.payload.callbackError?.(error?.message);
  }
}

export default function* authSaga() {
  yield takeLatest(signupRequest.type, handleSignup);
  yield takeLatest(passwordRequest.type, handleCreatePassword);
  yield takeLatest(verifypasswordRequest.type, handleVerifyPassword);
}
