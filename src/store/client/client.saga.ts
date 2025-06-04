import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getBankList,
  getClients,
  getLead,
  getReport,
  getTaskHistory,
  saveClientBasicDetails,
  setKycCheckedList,
  uploadKycFailure,
  uploadKycRequest,
  uploadKycSuccess,
  uploadPanFailure,
  uploadPanRequest,
  uploadPanSuccess,
  uploadResidenceFailure,
  uploadResidenceRequest,
  uploadResidenceSuccess,
} from './client.slice';
import {ClientApis} from '@services/api';
import {
  clientActions,
  ClientFormType,
  clientSelector,
  IBasicDetailsResponse,
  IclientFirmResponse,
  IBankListResponse,
  IClientInfoSuccessResponse,
  ILeadProgressResponse,
  IRemarkReportResponse,
  ITaskHistoryResponse,
  IUploadKycDocumentPayload,
  IUploadKycDocumentResponse,
  IVendorResponse,
  IvisitResponse,
  IKycCheckedResponse,
  IUploadPanDocumentsPayload,
  IUploadPanDocumentsResponse,
  IUploadResidenceDetailsResponse,
  IUploadResidenceDetailsPayload,
} from '.';
import {Result} from '@utils/TryCatch';
import clientApi from '@services/api/client.api';
import {PayloadAction} from '@reduxjs/toolkit';
import moment from 'moment';

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

function* saveBasicDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const basicDetailForm = clientFormData.BasicDetails;
  const body = {
    source_of_lead: basicDetailForm.sourceOfLead,
    location: basicDetailForm.location,
    city: basicDetailForm.city,
    state: basicDetailForm.state,
    type_of_visit: basicDetailForm.typeOfVisit,
    visit: parseInt(basicDetailForm.visitNumber),
    date_of_visit: moment(basicDetailForm.dateOfVisit).format('YYYY-MM-DD'),
  };

  const {data, error}: Result<IBasicDetailsResponse> = yield call(
    ClientApis.saveBasicDetailForm,
    body,
  );

  if (!error) {
    yield put(clientActions.saveClientId(data.data));
  }
}

function* saveClientFirmDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientFirmDetailForm = clientFormData.ClientFirmScreen;
  const body = {
    client_name: clientFirmDetailForm.clientName,
    firm_name: clientFirmDetailForm.firmName,
    contact_number: clientFirmDetailForm.contactNumber,
    firm_type: clientFirmDetailForm.typeOfFirm,
    business_vintage: clientFirmDetailForm.businessVintage,
    sector: clientFirmDetailForm.sector,
    bank_name: clientFirmDetailForm.bankName,
    cibil_score: clientFirmDetailForm.cibilScore,
    facility_type: clientFirmDetailForm.facilityType,
    existing_funding_sanctioned_amount: clientFirmDetailForm.existingFunding,
    estimated_funding_required: clientFirmDetailForm.estimatedFunding,
    credit_period_offer: clientFirmDetailForm.creditPeriod,
  };

  const {data, error}: Result<IclientFirmResponse> = yield call(
    ClientApis.saveClientFirmForm,
    body,
  );
  if (!error) {
    yield put(clientActions.saveClientId(data.message));
  }
}

function* saveVendorDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientVedorDetailForm = clientFormData.VendorScreen;
  const body = {
    product_category: clientVedorDetailForm.product,
    // product_type: clientVedorDetailForm.product,
    vendor_name: clientVedorDetailForm.vendorName,
    // address: clientVedorDetailForm.v,
    // city: string,
    // state: string,
    // pin_code: string,
    vendor_contact_number: clientVedorDetailForm.vendorContact,
    // monthly_sales_value: number,
  };

  const {data, error}: Result<IVendorResponse> = yield call(
    ClientApis.saveVendorForm,
    body,
  );
  if (!error) {
    yield put(clientActions.saveClientId(data.data));
  }
}

function* savevisitDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientVisitDetailForm = clientFormData.VisitScreen;
  const body = {
    // client_response: clientVisitDetailForm,
    intent: clientVisitDetailForm.intent,
    //   "date_of_next_visit": "2025-05-10T14:30:00Z",
    reason_for_not_interested: clientVisitDetailForm.reason,
    are_you_interested_for: clientVisitDetailForm.interested,
  };

  const {data, error}: Result<IvisitResponse> = yield call(
    ClientApis.savevisitForm,
    body,
  );
  if (!error) {
    yield put(clientActions.saveClientId(data.message));
  }
}

function* handleUploadKyc(action: PayloadAction<IUploadKycDocumentPayload>) {
  try {
    console.log('Called uploadKycRequest');
    const formData = new FormData();
    formData.append('doc', {
      uri: action.payload.doc.uri,
      name: action.payload.doc.name,
      type: action.payload.doc.type,
    } as any);
    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);
    formData.append('params', action.payload.params);
    formData.append('client_name', action.payload.client_name);

    const {data, error}: {data: IUploadKycDocumentResponse | null; error: any} =
      yield call(ClientApis.uploadKycDocument, formData);
    if (data) {
      yield put(uploadKycSuccess(data));
    } else {
      yield put(uploadKycFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadKycFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadPan(action: PayloadAction<IUploadPanDocumentsPayload>) {
  try {
    const {clientId, uploaded_by, doc, files} = action.payload;

    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('uploaded_by', uploaded_by);

    // Append each file
    files.forEach((file, index) => {
      formData.append('doc', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
    });

    // Append each PAN detail
    doc.forEach((item, index) => {
      formData.append(`doc[${index}][name_as_per_pan]`, item.name_as_per_pan);
      formData.append(`doc[${index}][pan_number]`, item.pan_number);
      formData.append(`doc[${index}][dob]`, item.dob);
    });

    const {
      data,
      error,
    }: {data: IUploadPanDocumentsResponse | null; error: any} = yield call(
      ClientApis.uploadPanDocument,
      formData,
    );

    if (data) {
      yield put(uploadPanSuccess(data));
    } else {
      yield put(uploadPanFailure(error?.message ?? 'PAN Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadPanFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadResidence(
  action: PayloadAction<IUploadResidenceDetailsPayload>,
) {
  try {
    const formData = new FormData();
    formData.append('doc', {
      uri: action.payload.doc.uri,
      name: action.payload.doc.name,
      type: action.payload.doc.type,
    } as any);

    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);
    formData.append('params', action.payload.params);
    formData.append('client_name', action.payload.client_name);
    formData.append('name_of_owner', action.payload.name_of_owner);
    formData.append('ownership_status', action.payload.ownership_status);

    const {
      data,
      error,
    }: {data: IUploadResidenceDetailsResponse | null; error: any} = yield call(
      ClientApis.uploadResidenceDocument,
      formData,
    );

    if (data) {
      yield put(uploadResidenceSuccess(data));
    } else {
      yield put(uploadResidenceFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadResidenceFailure(err?.message ?? 'Something went wrong'));
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

function* handleGetKycChecked(): unknown {
  const {data, error}: Result<IKycCheckedResponse> = yield call(
    clientApi.getKycChecked,
  );
  if (!error) {
    yield put(clientActions.setKycCheckedList(data.data));
  } else {
    yield put(clientActions.setKycCheckedList([]));
  }
}

export default function* clientSaga() {
  yield takeLatest(getClients.type, handleGetClient);
  yield takeLatest(getReport.type, handleGetRemarkReport);
  yield takeLatest(getLead.type, handleGetLeadProgress);
  yield takeLatest(getTaskHistory.type, handleGetTaskHistory);
  yield takeLatest(saveClientBasicDetails.type, saveBasicDetails);
  yield takeLatest(saveClientBasicDetails.type, saveClientFirmDetails);
  yield takeLatest(saveClientBasicDetails.type, saveVendorDetails);
  yield takeLatest(saveClientBasicDetails.type, savevisitDetails);
  yield takeLatest(uploadKycRequest.type, handleUploadKyc);
  yield takeLatest(uploadPanRequest.type, handleUploadPan);
  yield takeLatest(uploadResidenceRequest.type, handleUploadResidence);
  yield takeLatest(getBankList.type, hnadleGetBankList);
  yield takeLatest(setKycCheckedList.type, handleGetKycChecked);
}
