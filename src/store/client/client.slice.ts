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
  },
});

export const {
  getClients,
  setClientLoader,
  setClientList,
  setClientFormData,
  resetClientFormData,
  resetAllClientFormData,
} = clientSlice.actions;
export default clientSlice.reducer;
