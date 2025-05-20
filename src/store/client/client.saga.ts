import {call, put, takeLatest} from 'redux-saga/effects';
import {getClients, getLead, getReport, getTaskHistory} from './client.slice';
import {ClientApis} from '@services/api';
import {
  clientActions,
  IClientInfoSuccessResponse,
  ILeadProgressResponse,
  IRemarkReportResponse,
  ITaskHistoryResponse,
} from '.';
import {Result} from '@utils/TryCatch';
import clientApi from '@services/api/client.api';

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

function* handleGetRemarkReport(): unknown {
  const {data, error}: Result<IRemarkReportResponse> = yield call(
    ClientApis.getRemarkReport,
  );
  if (!error) {
    yield put(clientActions.setReportList(data.data));
  } else {
    yield put(clientActions.setReportList([]));
  }
}

function* handleGetLeadProgress(): unknown {
  const {data, error}: Result<ILeadProgressResponse> = yield call(
    clientApi.getLeadProgress,
  );
  if (!error) {
    yield put(clientActions.setLeadList(data.data));
  } else {
    yield put(clientActions.setLeadList([]));
  }
}

function* handleGetTaskHistory(): unknown {
  const {data, error}: Result<ITaskHistoryResponse> = yield call(
    clientApi.getTaskHistory,
  );
  if (!error) {
    yield put(clientActions.setTaskHistoryList(data.data));
  } else {
    yield put(clientActions.setTaskHistoryList([]));
  }
}

export default function* clientSaga() {
  yield takeLatest(getClients.type, handleGetClient);
  yield takeLatest(getReport.type, handleGetRemarkReport);
  yield takeLatest(getLead.type, handleGetLeadProgress);
  yield takeLatest(getTaskHistory.type, handleGetTaskHistory);
}
