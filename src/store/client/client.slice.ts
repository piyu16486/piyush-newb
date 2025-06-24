/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClientFormPayload,
  ClientFormType,
  ClientState,
  IBankListResponseDatum,
  IClientInfoResponseDatum,
  IFilterPayload,
  IFilterResponse,
  IKycCheckedResponseDatum,
  ILeadProgressResponseDatum,
  IRemarkReportResponseDatum,
  IsoftSanctionBankProductDatum,
  IsoftSanctionMethodDatum,
  ISoftSanctionPayload,
  ITaskHistoryResponseDatum,
  IuplaodCompanyPanResponse,
  IUploadAdharDocumentResponse,
  IUploadAdharDocumnetsPayload,
  IUploadCompanyInfoPayload,
  IUploadCompanyInfoResponse,
  IuploadCompanyPanPayload,
  IUploadGodDownDetailsResponse,
  IUploadGoDownDetailsPayload,
  IUploadGstPayload,
  IUploadGstResponse,
  IUploadKycDocumentPayload,
  IUploadKycDocumentResponse,
  IUploadPanDocumentsPayload,
  IUploadPanDocumentsResponse,
  IUploadResidenceDetailsPayload,
  IUploadResidenceDetailsResponse,
  IUploadShareholdingPayload,
  IUploadShareholdingResponse,
  IUploadUdhyamPayload,
  IUploadUdhyamResponse,
} from './client.types';
import {PayloadWithCallback} from '@type/global.types';

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
    Product: '',
    state: '',
    city: '',
    vendorName: '',
    address: '',
    pincode: '',
    vendorContact: '',
    vendorEmail: '',
    monthlySales: '',
  },
  VisitScreen: {
    intent: '',
    interested: '',
    UserResponse: '',
    nextVisitDate: '',
    reason: '',
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
  // Adhar Kyc
  adharLoading: false,
  adharData: null,
  adharError: null,
  // Residence Kyc
  residenceLoading: false,
  residenceData: null,
  residenceError: null,
  // Udhyam Kyc
  udhyamLoading: false,
  udhyamData: null,
  udhyamError: null,
  // Gst Kyc
  gstDocLoading: false,
  gstDocData: null,
  gtsDocError: null,
  // GoDown Kyc
  goDownLoading: false,
  goDownData: null,
  goDownError: null,
  // CompanyPan Upload
  CompanyPanLoading: false,
  CompanyPanData: null,
  CompanyPanError: null,
  // Shareholding Kyc
  ShareholdingLoading: false,
  ShareholdingData: null,
  ShareholdingError: null,
  // CompanyInfo Upload
  CompanyInfoLoading: false,
  CompanyInfoData: null,
  CompanyInfoError: null,
  // SoftSanction Bank Method
  SoftSanctionLoading: false,
  SoftSanctionData: [],
  SoftSanctionError: null,
  // SoftSanction BNKPRO
  SoftSanctionBNKPROLoading: false,
  SoftSanctionBNKPROData: [],
  SoftSanctionBNKPROError: null,
  // Filterbox
  FilterboxLoading: false,
  FilterboxData: null,
  FilterboxError: null,
  rulesetLoading: false,
  rulesetData: [],
  rulesetError: null,
  softSanctionClientLoading: false,
  softSanctionClientList: [],
  softSanctionClientError: null,
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
      state.clientFormId = undefined;
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
    deleteClientRequest: (state, action) => {},
    deleteClientSuccess: (state, action) => {
      state.clientList = state.clientList.filter(
        client => client.id !== action.payload,
      );
    },
    deleteClientFailure: (state, action) => {
      state.error = action.payload;
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
    getLeadDesciption: (
      state,
      _payload: PayloadAction<PayloadWithCallback<string, [Array<any>]>>,
    ) => {
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
    getKycChecked: (state, action: PayloadAction<string>) => {
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
    uploadAdharRequest(
      state,
      action: PayloadAction<IUploadAdharDocumnetsPayload>,
    ) {
      state.adharLoading = true;
      state.adharError = null;
    },
    uploadAdharSuccess(
      state,
      action: PayloadAction<IUploadAdharDocumentResponse>,
    ) {
      state.adharLoading = false;
      state.adharData = action.payload;
    },
    uploadAdharFailure(state, action: PayloadAction<string>) {
      state.adharLoading = false;
      state.adharError = action.payload;
    },
    clearAdhar(state) {
      state.adharLoading = false;
      state.adharData = null;
      state.adharError = null;
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
      state.residenceLoading = false;
      state.residenceData = null;
      state.residenceError = null;
    },
    uploadUdhyamRequest(state, action: PayloadAction<IUploadUdhyamPayload>) {
      state.udhyamLoading = true;
      state.udhyamError = null;
    },
    uploadUdhyamSuccess(state, action: PayloadAction<IUploadUdhyamResponse>) {
      state.udhyamLoading = false;
      state.udhyamData = action.payload;
    },
    uploadUdhyamFailure(state, action: PayloadAction<string>) {
      state.udhyamLoading = false;
      state.udhyamError = action.payload;
    },
    clearUplaodUdhyam(state) {
      state.udhyamLoading = false;
      state.udhyamData = null;
      state.udhyamError = null;
    },
    uploadGstRequest(state, action: PayloadAction<IUploadGstPayload>) {
      state.gstDocLoading = true;
      state.gtsDocError = null;
    },
    uploadGstSuccess(state, action: PayloadAction<IUploadGstResponse>) {
      state.gstDocLoading = false;
      state.gstDocData = action.payload;
    },
    uploadGstfailure(state, action: PayloadAction<string>) {
      state.gstDocLoading = false;
      state.gtsDocError = action.payload;
    },
    clearUplaodGst(state) {
      state.gstDocLoading = false;
      state.gstDocData = null;
      state.gtsDocError = null;
    },
    uploadGoDownRequest(
      state,
      action: PayloadAction<IUploadGoDownDetailsPayload>,
    ) {
      state.goDownLoading = true;
      state.goDownError = null;
    },
    uploadGoDownSuccess(
      state,
      action: PayloadAction<IUploadGodDownDetailsResponse>,
    ) {
      state.goDownLoading = false;
      state.goDownData = action.payload;
    },
    uploadGoDownFailure(state, action: PayloadAction<string>) {
      state.goDownLoading = false;
      state.goDownError = action.payload;
    },
    clearUploadGoDown(state) {
      state.goDownLoading = false;
      state.goDownData = null;
      state.goDownError = null;
    },
    uploadShareholdingRequest(
      state,
      action: PayloadAction<IUploadShareholdingPayload>,
    ) {
      state.ShareholdingLoading = true;
      state.ShareholdingError = null;
    },
    uploadShareholdingSuccess(
      state,
      action: PayloadAction<IUploadShareholdingResponse>,
    ) {
      state.ShareholdingLoading = false;
      state.ShareholdingData = action.payload;
    },
    uploadShareholdingFailure(state, action: PayloadAction<string>) {
      state.ShareholdingLoading = false;
      state.ShareholdingError = action.payload;
    },
    clearShareholding(state) {
      state.ShareholdingLoading = false;
      state.ShareholdingData = null;
      state.ShareholdingError = null;
    },
    uploadCompanyPanRequest(
      state,
      action: PayloadAction<IuploadCompanyPanPayload>,
    ) {
      state.CompanyPanLoading = true;
      state.CompanyPanError = null;
    },
    uploadCompanyPanSuccess(
      state,
      action: PayloadAction<IuplaodCompanyPanResponse>,
    ) {
      state.CompanyPanLoading = false;
      state.CompanyPanData = action.payload;
    },
    uploadCompanyPanFailure(state, action: PayloadAction<string>) {
      state.CompanyPanLoading = false;
      state.CompanyPanError = action.payload;
    },
    clearCompanyPan(state) {
      state.CompanyPanLoading = false;
      state.CompanyPanData = null;
      state.CompanyPanError = null;
    },
    uploadCompanyInfoRequest(
      state,
      action: PayloadAction<IUploadCompanyInfoPayload>,
    ) {
      state.CompanyInfoLoading = true;
      state.CompanyInfoError = null;
    },
    uploadCompanyInfoSuccess(
      state,
      action: PayloadAction<IUploadCompanyInfoResponse>,
    ) {
      state.CompanyInfoLoading = false;
      state.CompanyInfoData = action.payload;
    },
    uploadCompanyInfoFailure(state, action: PayloadAction<string>) {
      state.CompanyInfoLoading = false;
      state.CompanyInfoError = action.payload;
    },
    clearCompanyInfo(state) {
      state.CompanyInfoLoading = false;
      state.CompanyInfoData = null;
      state.CompanyInfoError = null;
    },
    setSoftSanctionLoader: (state, action: PayloadAction<boolean>) => {
      state.SoftSanctionLoading = action.payload;
    },
    getSoftSanctionRequest: (
      state,
      _action: PayloadAction<ISoftSanctionPayload>,
    ) => {
      state.SoftSanctionLoading = true;
    },
    getSoftSanction: state => {
      state.SoftSanctionLoading = true;
    },
    setSoftSanctionList: (
      state,
      action: PayloadAction<Array<IsoftSanctionMethodDatum>>,
    ) => {
      state.SoftSanctionLoading = false;
      state.SoftSanctionData = action.payload;
    },
    resetSoftSanction: state => {
      state.SoftSanctionData = [];
      state.SoftSanctionLoading = false;
    },
    setSoftSanctionBnkProLoader: (state, action: PayloadAction<boolean>) => {
      state.SoftSanctionBNKPROLoading = action.payload;
    },
    getSoftSanctionBnkPro: state => {
      state.SoftSanctionBNKPROLoading = true;
    },
    setSoftSanctionBnkProList: (
      state,
      action: PayloadAction<Array<IsoftSanctionBankProductDatum>>,
    ) => {
      state.SoftSanctionBNKPROLoading = false;
      state.SoftSanctionBNKPROData = action.payload;
    },
    resetSoftSanctionBnkPro: state => {
      state.SoftSanctionBNKPROData = [];
      state.SoftSanctionBNKPROLoading = false;
    },
    FilterRequest(state, action: PayloadAction<IFilterPayload>) {
      state.FilterboxLoading = true;
      state.FilterboxError = null;
    },
    FilterSucess(state, action: PayloadAction<IFilterResponse>) {
      state.FilterboxLoading = false;
      state.FilterboxData = action.payload;
    },
    FilterFailure(state, action: PayloadAction<string>) {
      state.FilterboxLoading = false;
      state.FilterboxError = action.payload;
    },
    clearFilter(state) {
      state.FilterboxLoading = false;
      state.FilterboxData = null;
      state.FilterboxError = null;
    },
    getSoftSanctionRuleset: (state, _action) => {
      state.rulesetLoading = true;
      state.rulesetError = null;
    },
    setSoftSanctionRuleset: (state, action) => {
      state.rulesetLoading = false;
      state.rulesetData = action.payload;
    },
    setSoftSanctionRulesetError: (state, action) => {
      state.rulesetLoading = false;
      state.rulesetError = action.payload;
    },
    getSoftSanctionClientList: (state) => {
      state.softSanctionClientLoading = true;
      state.softSanctionClientError = null;
    },
    setSoftSanctionClientList: (state, action) => {
      state.softSanctionClientLoading = false;
      state.softSanctionClientList = action.payload;
    },
    setSoftSanctionClientListError: (state, action) => {
      state.softSanctionClientLoading = false;
      state.softSanctionClientError = action.payload;
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
  getLeadDesciption,
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
  uploadAdharRequest,
  uploadAdharSuccess,
  uploadAdharFailure,
  clearAdhar,
  uploadResidenceRequest,
  uploadResidenceSuccess,
  uploadResidenceFailure,
  clearUploadResidence,
  uploadUdhyamRequest,
  uploadUdhyamSuccess,
  uploadUdhyamFailure,
  clearUplaodUdhyam,
  uploadGstRequest,
  uploadGstSuccess,
  uploadGstfailure,
  clearUplaodGst,
  uploadGoDownRequest,
  uploadGoDownSuccess,
  uploadGoDownFailure,
  clearUploadGoDown,
  uploadShareholdingRequest,
  uploadShareholdingSuccess,
  uploadShareholdingFailure,
  clearShareholding,
  uploadCompanyPanRequest,
  uploadCompanyPanSuccess,
  uploadCompanyPanFailure,
  clearCompanyPan,
  uploadCompanyInfoRequest,
  uploadCompanyInfoSuccess,
  uploadCompanyInfoFailure,
  clearCompanyInfo,
  setSoftSanctionLoader,
  getSoftSanctionRequest,
  getSoftSanction,
  setSoftSanctionList,
  resetSoftSanction,
  setSoftSanctionBnkProLoader,
  getSoftSanctionBnkPro,
  setSoftSanctionBnkProList,
  resetSoftSanctionBnkPro,
  FilterRequest,
  FilterSucess,
  FilterFailure,
  clearFilter,
  getSoftSanctionRuleset,
  setSoftSanctionRuleset,
  setSoftSanctionRulesetError,
  getSoftSanctionClientList,
  setSoftSanctionClientList,
  setSoftSanctionClientListError,
} = clientSlice.actions;
export default clientSlice.reducer;
