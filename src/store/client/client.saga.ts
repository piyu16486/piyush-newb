import {call, put, takeLatest} from 'redux-saga/effects';
import {getClients} from './client.slice';
import {ClientApis} from '@services/api';
import {clientActions, IClientInfoSuccessResponse} from '.';
import {Result} from '@utils/TryCatch';

function* handleGetClient(): unknown {
  const {data, error}: Result<IClientInfoSuccessResponse> = yield call(
    ClientApis.getAllClients,
  );
  if (!error) {
    yield put(clientActions.setClientList(data.data));
  } else {
    yield put(clientActions.setClientList([]));
  }
}

export default function* clientSaga() {
  yield takeLatest(getClients.type, handleGetClient);
}
