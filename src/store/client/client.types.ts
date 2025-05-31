import {
  BasicDetailsNames,
  ClientFirmNames,
  VendorNames,
  VisitNames,
} from '@screens/CreateClientForm/CreateClientForm.type';

export type ClientState = {
  clientLoader: boolean;
  clientList: Array<IClientInfoResponseDatum>;
  clientFormData: ClientFormType;
  clientFormId: number | undefined;
};

type BasicDetailsType = Record<BasicDetailsNames, string>;
type ClientFirmScreenType = Record<ClientFirmNames, string>;
type VendorScreenType = Record<VendorNames, string>;
type VisitScreenType = Record<VisitNames, string>;
export type ClientFormType = {
  BasicDetails: BasicDetailsType;
  ClientFirmScreen: ClientFirmScreenType;
  VendorScreen: VendorScreenType;
  VisitScreen: VisitScreenType;
};

export type ClientFormPayload =
  | {
      formName: 'BasicDetails';
      name: BasicDetailsNames;
      value: string;
    }
  | {
      formName: 'ClientFirmScreen';
      name: ClientFirmNames;
      value: string;
    }
  | {
      formName: 'VendorScreen';
      name: VendorNames;
      value: string;
    }
  | {
      formName: 'VisitScreen';
      name: VisitNames;
      value: string;
    };

//

export interface IClientInfoSuccessResponse {
  statusCode: number;
  message: string;
  data: Array<IClientInfoResponseDatum>;
}

export interface IClientInfoResponseDatum {
  id: number;
  source_of_lead: string;
  location: string;
  client_name: string;
  firm_name: string;
  bank_name: string;
  estimated_funding_required: number;
  user: null;
  vendor: Array<Vendor>;
}

export interface Vendor {
  id: number;
  monthly_sales_value: number;
}

//
export type IBasicDetailsPayload = {
  source_of_lead: string;
  location: string;
  city: string;
  state: string;
  type_of_visit: string;
  visit: number;
  date_of_visit: string;
};

export type IBasicDetailsResponse = {
  statusCode: number;
  message: string;
  data: number;
};
