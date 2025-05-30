import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getBankList,
  getClients,
  getLead,
  getReport,
  getTaskHistory,
  uploadKycFailure,
  uploadKycRequest,
  uploadKycSuccess,
} from './client.slice';
import {ClientApis} from '@services/api';
import {
  clientActions,
  IBankListResponse,
  IClientInfoSuccessResponse,
  ILeadProgressResponse,
  IRemarkReportResponse,
  ITaskHistoryResponse,
  IUploadKycDocumentPayload,
  IUploadKycDocumentResponse,
} from '.';
import {Result} from '@utils/TryCatch';
import clientApi from '@services/api/client.api';
import {PayloadAction} from '@reduxjs/toolkit';

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

function* handleUploadKyc(action: PayloadAction<IUploadKycDocumentPayload>) {
  try {
    const formData = new FormData();
    formData.append('doc', {
      uri: action.payload.doc.uri,
      name: action.payload.doc.name,
      type: action.payload.doc.type,
    } as any); // React Native file input
    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);
    formData.append('params', action.payload.params);
    formData.append('client_name', action.payload.client_name);

    const {data, error}: {data: IUploadKycDocumentResponse | null; error: any} =
      yield call(uploadKycDocument, formData);

    if (data) {
      yield put(uploadKycSuccess(data));
    } else {
      yield put(uploadKycFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadKycFailure(err?.message ?? 'Something went wrong'));
  }
}

function* hnadleGetBankList(): unknown {
  const {data, error}: Result<IBankListResponse> = yield call(
    clientApi.getBankList,
  );
  if (!error) {
    yield put(clientActions.setBankList(data.data));
  } else {
    yield put(clientActions.setBankList([]));
  }
}

export default function* clientSaga() {
  yield takeLatest(getClients.type, handleGetClient);
  yield takeLatest(getReport.type, handleGetRemarkReport);
  yield takeLatest(getLead.type, handleGetLeadProgress);
  yield takeLatest(getTaskHistory.type, handleGetTaskHistory);
  yield takeLatest(uploadKycRequest.type, handleUploadKyc);
  yield takeLatest(getBankList.type, hnadleGetBankList);
}
