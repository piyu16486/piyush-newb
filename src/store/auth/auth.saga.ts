import {call, put, takeLatest} from 'redux-saga/effects';
import {loginRequest, loginSuccess, loginFailure} from './auth.slice';
import {PayloadAction} from '@reduxjs/toolkit';
import {LoginPayload} from './auth.types';
import {AuthApis} from '@services/api';

function* handleLogin(action: PayloadAction<LoginPayload>): unknown {
  try {
    const response = yield call(AuthApis.apiLogin, action.payload);
    yield put(loginSuccess(response));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
