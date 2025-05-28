/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  BasicDetailPayload,
  ClientFormPayload,
  ClientFormType,
  ClientState,
  IClientInfoResponseDatum,
  ILeadProgressResponseDatum,
  IRemarkReportResponseDatum,
  ITaskHistoryResponseDatum,
  IUploadKycDocumentPayload,
  IUploadKycDocumentResponse,
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
  // kyc
  loading: false,
  data: null,
  error: null,
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
  },
});

export const {
  getClients,
  setClientLoader,
  setClientList,
  setClientFormData,
  resetClientFormData,
  resetAllClientFormData,
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
} = clientSlice.actions;
export default clientSlice.reducer;
