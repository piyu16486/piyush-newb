import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  FilterRequest,
  getBankList,
  getClients,
  getLead,
  getReport,
  getSoftSanction,
  getSoftSanctionBnkPro,
  getTaskHistory,
  saveClientBasicDetails,
  setKycCheckedList,
  uploadAdharFailure,
  uploadAdharRequest,
  uploadAdharSuccess,
  uploadCompanyInfoFailure,
  uploadCompanyInfoRequest,
  uploadCompanyInfoSuccess,
  uploadCompanyPanFailure,
  uploadCompanyPanRequest,
  uploadCompanyPanSuccess,
  uploadGoDownFailure,
  uploadGoDownRequest,
  uploadGoDownSuccess,
  uploadGstRequest,
  uploadGstSuccess,
  uploadKycFailure,
  uploadKycRequest,
  uploadKycSuccess,
  uploadPanFailure,
  uploadPanRequest,
  uploadPanSuccess,
  uploadResidenceFailure,
  uploadResidenceRequest,
  uploadResidenceSuccess,
  uploadShareholdingFailure,
  uploadShareholdingRequest,
  uploadShareholdingSuccess,
  uploadUdhyamFailure,
  uploadUdhyamRequest,
  uploadUdhyamSuccess,
} from './client.slice';
import {Api, ClientApis} from '@services/api';
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
  IUploadUdhyamPayload,
  IUploadUdhyamResponse,
  IUploadGstPayload,
  IUploadGstResponse,
  IUploadGoDownDetailsPayload,
  IUploadGodDownDetailsResponse,
  IUploadShareholdingPayload,
  IUploadShareholdingResponse,
  IuploadCompanyPanPayload,
  IuplaodCompanyPanResponse,
  IUploadAdharDocumnetsPayload,
  IUploadAdharDocumentResponse,
  IUploadCompanyInfoPayload,
  IUploadCompanyInfoResponse,
  ISoftSanctionResponse,
  IBasicDetailsPayload,
  IClientFirmPayload,
  IvendorPayload,
  IVisitPayload,
  IsoftSanctionBankProductResponse,
  IFilterPayload,
  IFilterResponse,
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

  const body: IBasicDetailsPayload = {
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

  if (!error && data) {
    yield put(clientActions.saveClientId(data.data));
  }
}

function* saveClientFirmDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientId: number = yield select(clientSelector.getClientId);
  const clientFirmDetailForm = clientFormData.ClientFirmScreen;

  const body: IClientFirmPayload = {
    client_name: clientFirmDetailForm.clientName,
    firm_name: clientFirmDetailForm.firmName,
    contact_number: clientFirmDetailForm.contactNumber,
    firm_type: clientFirmDetailForm.typeOfFirm,
    business_vintage: clientFirmDetailForm.businessVintage,
    sector: clientFirmDetailForm.sector,
    bank_name: clientFirmDetailForm.bankName,
    cibil_score: parseInt(clientFirmDetailForm.cibilScore),
    facility_type: clientFirmDetailForm.facilityType,
    existing_funding_sanctioned_amount: parseInt(
      clientFirmDetailForm.existingFunding,
    ),
    estimated_funding_required: parseInt(clientFirmDetailForm.estimatedFunding),
    credit_period_offer: parseInt(clientFirmDetailForm.creditPeriod),
  };

  const {data, error}: Result<IclientFirmResponse> = yield call(
    ClientApis.saveClientFirmForm,
    String(clientId),
    body,
  );

  if (!error) {
    yield put(clientActions.saveClientFirmDetails());
  }
}

function* saveVendorDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientId: number = yield select(clientSelector.getClientId);
  const vendorForm = clientFormData.VendorScreen;

  const body: IvendorPayload = {
    product_category: vendorForm.Product,
    product_type: vendorForm.Product,
    vendor_name: vendorForm.vendorName,
    address: vendorForm.address,
    city: vendorForm.city,
    state: vendorForm.state,
    pin_code: vendorForm.pincode,
    vendor_contact_number: vendorForm.vendorContact,
    monthly_sales_value: parseInt(vendorForm.monthlySales),
  };

  const {data, error}: Result<IVendorResponse> = yield call(
    ClientApis.saveVendorForm,
    String(clientId),
    body,
  );

  if (!error) {
    yield put(clientActions.saveVendorDetails()); // savevisitDetails
  }
}

function* savevisitDetails(): unknown {
  const clientFormData: ClientFormType = yield select(
    clientSelector.getClientFormData,
  );
  const clientId: number = yield select(clientSelector.getClientId);
  const visitForm = clientFormData.VisitScreen;

  const body: IVisitPayload = {
    client_response: visitForm.UserResponse,
    intent: visitForm.intent,
    date_of_next_visit: moment(visitForm.nextVisitDate).format('YYYY-MM-DD'),
    reason_for_not_interested: visitForm.reason,
    are_you_interested_for: visitForm.interested,
  };

  const {data, error}: Result<IvisitResponse> = yield call(
    ClientApis.saveVisitForm,
    String(clientId),
    body,
  );

  if (!error) {
    yield put(clientActions.saveVisitDetails());
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

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, {
        // Unique key for each file
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
    });

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

function* handleUploadAdhar(
  action: PayloadAction<IUploadAdharDocumnetsPayload>,
) {
  try {
    const {clientId, uploaded_by, doc, files} = action.payload;

    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('uploaded_by', uploaded_by);

    files.forEach(file => {
      formData.append('doc', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
    });

    doc.forEach((item, index) => {
      formData.append(
        `doc[${index}][name_as_per_aadhar]`,
        item.name_as_per_aadhar,
      );
      formData.append(`doc[${index}[aadhar_number]`, item.aadhar_number);
    });
    const {
      data,
      error,
    }: {data: IUploadAdharDocumentResponse | null; error: any} = yield call(
      ClientApis.uploadAadharDocument,
      formData,
    );

    if (data) {
      yield put(uploadAdharSuccess(data));
    } else {
      yield put(uploadAdharFailure(error?.message ?? 'Adhar Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadAdharFailure(err?.message ?? 'Something went wrong'));
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

function* handleUploadUdhyam(action: PayloadAction<IUploadUdhyamPayload>) {
  try {
    console.log('Uploading Udhyam Document...');

    const formData = new FormData();

    // Attach each file in doc[]
    action.payload.doc.forEach((file, index) => {
      formData.append('doc', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    // Text fields
    formData.append(
      'doc[name_as_per_udhyam]',
      action.payload.docDetails.name_as_per_udhyam,
    );
    formData.append('doc[urn_number]', action.payload.docDetails.urn_number);
    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);

    // API Call
    const {data, error}: {data: IUploadUdhyamResponse | null; error: any} =
      yield call(ClientApis.uploadUdhyamDocument, formData);

    if (data) {
      yield put(uploadUdhyamSuccess(data));
    } else {
      yield put(uploadUdhyamFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadUdhyamFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadGst(action: PayloadAction<IUploadGstPayload>) {
  try {
    console.log('Uploading GST Document...');

    const formData = new FormData();

    // Attach the document
    formData.append('doc', {
      uri: action.payload.doc.uri,
      name: action.payload.doc.name,
      type: action.payload.doc.type,
    } as any);

    // Append other form fields
    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);
    formData.append('name_as_per_gst', action.payload.name_as_per_gst);
    formData.append('gst_number', action.payload.gst_number);
    formData.append('params', action.payload.params);

    // API Call
    const {data, error}: {data: IUploadGstResponse | null; error: any} =
      yield call(ClientApis.uploadGstDocument, formData);

    if (data) {
      yield put(uploadGstSuccess(data));
    } else {
      yield put(uploadKycFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadKycFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadGoDown(
  action: PayloadAction<IUploadGoDownDetailsPayload>,
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
    }: {data: IUploadGodDownDetailsResponse | null; error: any} = yield call(
      ClientApis.uploadGoDownDocument,
      formData,
    );

    if (data) {
      yield put(uploadGoDownSuccess(data));
    } else {
      yield put(uploadGoDownFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadGoDownFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadShareholding(
  action: PayloadAction<IUploadShareholdingPayload>,
) {
  try {
    console.log('Called UploadShareholdingRequest');
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

    const {
      data,
      error,
    }: {data: IUploadShareholdingResponse | null; error: any} = yield call(
      ClientApis.uploadShareholdingDocument,
      formData,
    );
    if (data) {
      yield put(uploadShareholdingSuccess(data));
    } else {
      yield put(
        uploadGoDownFailure(error?.message ?? 'Shareholding Upload failed'),
      );
    }
  } catch (err: any) {
    yield put(
      uploadShareholdingFailure(err?.message ?? 'Something went wrong'),
    );
  }
}

function* handleUploadCompanyPan(
  action: PayloadAction<IuploadCompanyPanPayload>,
) {
  try {
    console.log('Uploading CompanyPan Document...');

    const formData = new FormData();

    action.payload.doc.forEach(file => {
      formData.append('doc', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      } as any);
    });

    formData.append(
      'doc[name_as_per_pan]',
      action.payload.docDetails.name_as_per_pan,
    );
    formData.append('doc[pan_number]', action.payload.docDetails.pan_number);
    formData.append('clientId', action.payload.clientId.toString());
    formData.append('uploaded_by', action.payload.uploaded_by);

    const {data, error}: {data: IuplaodCompanyPanResponse | null; error: any} =
      yield call(ClientApis.uploadCompanyPanDocument, formData);

    if (data) {
      yield put(uploadCompanyPanSuccess(data));
    } else {
      yield put(uploadCompanyPanFailure(error?.message ?? 'Upload failed'));
    }
  } catch (err: any) {
    yield put(uploadCompanyPanFailure(err?.message ?? 'Something went wrong'));
  }
}

function* handleUploadCompanyInfo(
  action: PayloadAction<IUploadCompanyInfoPayload>,
) {
  try {
    const {clientId, uploaded_by, doc} = action.payload;

    const formData = new FormData();
    formData.append('clientId', clientId.toString());
    formData.append('uploaded_by', uploaded_by);

    doc.forEach(file => {
      formData.append('doc', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any);
    });

    const {data, error}: {data: IUploadCompanyInfoResponse | null; error: any} =
      yield call(ClientApis.uploadCopmanyInfoDocument, formData);

    if (error) {
      yield put(
        uploadCompanyInfoFailure(error.message || 'Something went wrong'),
      );
    } else {
      yield put(uploadCompanyInfoSuccess(data!));
    }
  } catch (err: any) {
    yield put(
      uploadCompanyInfoFailure(err.message || 'Unexpected error occurred'),
    );
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

function* handleGetSoftSantion(): unknown {
  const {data, error}: Result<ISoftSanctionResponse> = yield call(
    ClientApis.getSoftSanction,
  );
  if (!error) {
    yield put(clientActions.setSoftSanctionList(data.data));
  } else {
    yield put(clientActions.setSoftSanctionList([]));
  }
}

function* handleGetSoftSantionBnkPro(): unknown {
  const {data, error}: Result<IsoftSanctionBankProductResponse> = yield call(
    ClientApis.getSoftSanctionProductBank,
  );
  if (!error) {
    yield put(clientActions.setSoftSanctionBnkProList(data.data));
  } else {
    yield put(clientActions.setSoftSanctionBnkProList([]));
  }
}

function* handleFilterbox(action: PayloadAction<IFilterPayload>) {
  try {
    const {data, error}: {data: IFilterResponse | null; error: any} =
      yield call(clientApi.FilterBox, action.payload);

    if (data) {
      yield put(clientActions.FilterSucess(data));
    } else {
      yield put(clientActions.FilterFailure(error?.message || 'Unknown error'));
    }
  } catch (error: any) {
    yield put(clientActions.FilterFailure(error.message || 'Unexpected error'));
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
  yield takeLatest(uploadAdharRequest.type, handleUploadAdhar);
  yield takeLatest(uploadResidenceRequest.type, handleUploadResidence);
  yield takeLatest(uploadUdhyamRequest.type, handleUploadUdhyam);
  yield takeLatest(uploadGstRequest.type, handleUploadGst);
  yield takeLatest(uploadGoDownRequest.type, handleUploadGoDown);
  yield takeLatest(uploadShareholdingRequest.type, handleUploadShareholding);
  yield takeLatest(uploadCompanyInfoRequest.type, handleUploadCompanyInfo);
  yield takeLatest(uploadCompanyPanRequest.type, handleUploadCompanyPan);
  yield takeLatest(getBankList.type, hnadleGetBankList);
  yield takeLatest(setKycCheckedList.type, handleGetKycChecked);
  yield takeLatest(getSoftSanction.type, handleGetSoftSantion);
  yield takeLatest(getSoftSanctionBnkPro.type, handleGetSoftSantionBnkPro);
  yield takeLatest(FilterRequest.type, handleFilterbox);
}
