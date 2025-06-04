/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClientFormPayload,
  ClientFormType,
  ClientState,
  IBankListResponseDatum,
  IClientInfoResponseDatum,
  IKycCheckedResponseDatum,
  ILeadProgressResponseDatum,
  IRemarkReportResponseDatum,
  ITaskHistoryResponseDatum,
  IUploadKycDocumentPayload,
  IUploadKycDocumentResponse,
  IUploadPanDocumentsPayload,
  IUploadPanDocumentsResponse,
  IUploadResidenceDetailsPayload,
  IUploadResidenceDetailsResponse,
} from './client.types';

const clientFormData: ClientFormType = {
  BasicDetails: {
    city: '',
    dateOfVisit: '',
    location: '',
    sourceOfLead: '',
    state: '',
    typeOfVisit: '',
    visitNumber: '',
  },
  ClientFirmScreen: {
    bankName: '',
    businessVintage: '',
    cibilScore: '',
    clientName: '',
    contactNumber: '',
    creditPeriod: '',
    estimatedFunding: '',
    firmName: '',
    facilityType: '',
    sector: '',
    typeOfFirm: '',
    existingFunding: '',
  },
  VendorScreen: {
    monthlySales: '',
    product: '',
    vendorContact: '',
    vendorName: '',
    vendorEmail: '',
  },
  VisitScreen: {
    intent: '',
    nextVisitDate: '',
    interested: '',
    reason: '',
    visitRemarks: '',
  },
};

const initialState: ClientState = {
  clientLoader: false,
  clientList: [],
  clientFormData: clientFormData,
  clientFormId: undefined,
  //Remark Report fields
  reportLoader: false,
  reportList: [],
  //Lead Progress fields
  leadLoader: false,
  leadList: [],
  //Task History fields
  TaskHistoryLoader: false,
  TaskHistoryList: [],
  //Basic Detail fields
  basicLoader: false,
  clientId: null,
  // Profile kyc
  loading: false,
  data: null,
  error: null,
  // Bank List
  BankLoader: false,
  BankList: [],
  // Kyc Checked
  KycCheckedLoader: false,
  kycCheckedList: [],
  // Pan Kyc
  panLoading: false,
  panData: null,
  panError: null,
  // Residence Kyc
  residenceLoading: false,
  residenceData: null,
  residenceError: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // Set Client Loader
    setClientLoader: (state, action: PayloadAction<boolean>) => {
      state.clientLoader = action.payload;
    },
    // Get Client from api
    getClients: state => {
      state.clientLoader = true;
    },
    setClientList: (
      state,
      action: PayloadAction<Array<IClientInfoResponseDatum>>,
    ) => {
      state.clientLoader = false;
      state.clientList = action.payload;
    },
    saveClientId: (state, action: PayloadAction<number>) => {
      state.clientFormId = action.payload;
    },
    // Set Client Form Data
    setClientFormData: (state, action: PayloadAction<ClientFormPayload>) => {
      const {formName, name, value} = action.payload;
      if (state.clientFormData[formName]) {
        // @ts-expect-error: name is correctly typed per formName in ClientFormPayload
        state.clientFormData[formName][name] = value;
      }
    },
    resetClientFormData: (
      state,
      action: PayloadAction<keyof ClientFormType>,
    ) => {
      // @ts-expect-error: name is correctly typed per formName in ClientFormPayload
      state.clientFormData[action.payload] = clientFormData[action.payload];
    },
    resetAllClientFormData: state => {
      state.clientFormData = clientFormData;
    },
    // Save Client
    saveClientBasicDetails: state => {
      state.clientLoader = false;
    },
    saveClientFirmDetails: state => {
      state.clientLoader = false;
    },
    saveVendorDetails: state => {
      state.clientLoader = false;
    },
    saveVisitDetails: state => {
      state.clientLoader = false;
    },
    // Remark Report Actions
    getReport: state => {
      state.reportLoader = true;
    },
    setReportList: (
      state,
      action: PayloadAction<IRemarkReportResponseDatum[]>,
    ) => {
      state.reportLoader = false;
      state.reportList = action.payload;
    },
    resetReportList: state => {
      state.reportList = [];
      state.reportLoader = false;
    },
    // Lead Progress Actions
    getLead: state => {
      state.leadLoader = true;
    },
    setLeadList: (
      state,
      action: PayloadAction<ILeadProgressResponseDatum[]>,
    ) => {
      state.leadLoader = false;
      state.leadList = action.payload;
    },
    resetLeadList: state => {
      state.leadList = [];
      state.leadLoader = false;
    },
    // Task History Actions
    getTaskHistory: state => {
      state.TaskHistoryLoader = true;
    },
    setTaskHistoryList: (
      state,
      action: PayloadAction<ITaskHistoryResponseDatum[]>,
    ) => {
      state.TaskHistoryLoader = false;
      state.TaskHistoryList = action.payload;
    },
    resetTaskHistoryList: state => {
      state.TaskHistoryList = [];
      state.TaskHistoryLoader = false;
    },
    uploadKycRequest(state, action: PayloadAction<IUploadKycDocumentPayload>) {
      state.loading = true;
      state.error = null;
    },
    uploadKycSuccess(state, action: PayloadAction<IUploadKycDocumentResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    uploadKycFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUploadKyc(state) {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
    setBankLoader: (state, action: PayloadAction<boolean>) => {
      state.BankLoader = action.payload;
    },
    getBankList: state => {
      state.BankLoader = true;
    },
    setBankList: (
      state,
      action: PayloadAction<Array<IBankListResponseDatum>>,
    ) => {
      state.BankLoader = false;
      state.BankList = action.payload;
    },
    resetBankList: state => {
      state.BankList = [];
      state.BankLoader = false;
    },
    setKycCheckedLoader: (state, action: PayloadAction<boolean>) => {
      state.KycCheckedLoader = action.payload;
    },
    getKycChecked: state => {
      state.KycCheckedLoader = true;
    },
    setKycCheckedList: (
      state,
      action: PayloadAction<Array<IKycCheckedResponseDatum>>,
    ) => {
      state.KycCheckedLoader = false;
      state.kycCheckedList = action.payload;
    },
    resetKycCheckedList: state => {
      state.kycCheckedList = [];
      state.KycCheckedLoader = false;
    },
    uploadPanRequest(state, action: PayloadAction<IUploadPanDocumentsPayload>) {
      state.panLoading = true;
      state.panError = null;
    },
    uploadPanSuccess(
      state,
      action: PayloadAction<IUploadPanDocumentsResponse>,
    ) {
      state.panLoading = false;
      state.panData = action.payload;
    },
    uploadPanFailure(state, action: PayloadAction<string>) {
      state.panLoading = false;
      state.panError = action.payload;
    },
    clearPanUpload(state) {
      state.panLoading = false;
      state.panData = null;
      state.panError = null;
    },
    uploadResidenceRequest(
      state,
      action: PayloadAction<IUploadResidenceDetailsPayload>,
    ) {
      state.residenceLoading = true;
      state.residenceError = null;
    },
    uploadResidenceSuccess(
      state,
      action: PayloadAction<IUploadResidenceDetailsResponse>,
    ) {
      state.residenceLoading = false;
      state.residenceData = action.payload;
    },
    uploadResidenceFailure(state, action: PayloadAction<string>) {
      state.residenceLoading = false;
      state.residenceError = action.payload;
    },
    clearUploadResidence(state) {
      state.reportLoader = false;
      state.residenceData = null;
      state.residenceError = null;
    },
  },
});

export const {
  getClients,
  setClientLoader,
  setClientList,
  saveClientId,
  setClientFormData,
  resetClientFormData,
  resetAllClientFormData,
  saveClientBasicDetails,
  saveClientFirmDetails,
  saveVendorDetails,
  saveVisitDetails,
  getReport,
  setReportList,
  resetReportList,
  getLead,
  setLeadList,
  resetLeadList,
  getTaskHistory,
  setTaskHistoryList,
  resetTaskHistoryList,
  uploadKycRequest,
  uploadKycSuccess,
  uploadKycFailure,
  clearUploadKyc,
  setBankLoader,
  getBankList,
  setBankList,
  resetBankList,
  setKycCheckedLoader,
  getKycChecked,
  setKycCheckedList,
  resetKycCheckedList,
  uploadPanRequest,
  uploadPanSuccess,
  uploadPanFailure,
  clearPanUpload,
  uploadResidenceRequest,
  uploadResidenceSuccess,
  uploadResidenceFailure,
  clearUploadResidence,
} = clientSlice.actions;
export default clientSlice.reducer;
