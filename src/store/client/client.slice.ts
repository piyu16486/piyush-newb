import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ClientFormPayload,
  ClientFormType,
  ClientState,
  IClientInfoResponseDatum,
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
} = clientSlice.actions;
export default clientSlice.reducer;
