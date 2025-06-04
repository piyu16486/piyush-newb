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

  reportLoader: boolean;
  reportList: Array<IRemarkReportResponseDatum>;

  leadLoader: boolean;
  leadList: Array<ILeadProgressResponseDatum>;

  TaskHistoryLoader: boolean;
  TaskHistoryList: Array<ITaskHistoryResponseDatum>;

  basicLoader: boolean;
  clientId: null;

  // KYC Upload
  loading: boolean;
  data: IUploadKycDocumentResponse | null;
  error: string | null;

  // PAN Upload
  panLoading: boolean;
  panData: IUploadPanDocumentsResponse | null;
  panError: string | null;

  // Residence Upload
  residenceLoading: boolean;
  residenceData: IUploadResidenceDetailsResponse | null;
  residenceError: string | null;

  BankLoader: boolean;
  BankList: Array<IBankListResponseDatum>;

  KycCheckedLoader: boolean;
  kycCheckedList: Array<IKycCheckedResponseDatum>;
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

export interface IRemarkReportResponse {
  statusCode: number;
  message: string;
  data: Array<IRemarkReportResponseDatum>;
}

export interface IRemarkReportResponseDatum {
  id: number;
  client_name: string;
  user: null;
  task: Array<Task>;
}

export interface Task {
  id: number;
  task_type: string;
  task_description: string;
  task_status: string;
  remark: null;
  completed_at: null;
}

export interface ILeadProgressResponse {
  statusCode: number;
  message: string;
  data: Array<ILeadProgressResponseDatum>;
}

export interface ILeadProgressResponseDatum {}

export interface ITaskHistoryResponse {
  statusCode: number;
  message: string;
  data: Array<ITaskHistoryResponseDatum>;
}

export interface ITaskHistoryResponseDatum {
  id: number;
  assigned_by: string;
  assigned_to: string;
  client_name: string;
  assigned_at: string;
  task_type: string;
  task_description: string;
  task_status: string;
  remark: null;
  completed_at: null;
  client: number;
}

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

export type IClientFirmPayload = {
  client_name: string;
  firm_name: string;
  contact_number: string;
  firm_type: string;
  business_vintage: string;
  sector: string;
  bank_name: string;
  cibil_score: number;
  facility_type: string;
  existing_funding_sanctioned_amount: number;
  estimated_funding_required: number;
  credit_period_offer: number;
};

export type IclientFirmResponse = {
  statusCode: number;
  message: string;
};

export type IvendorPayload = {
  product_category: string;
  product_type: string;
  vendor_name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  vendor_contact_number: string;
  monthly_sales_value: number;
};

export type IVendorResponse = {
  statusCode: number;
  message: string;
  data: IVendorResponseDatum[];
};

export type IVendorResponseDatum = {
  id: number;
  product_category: string;
  product_type: string;
  vendor_name: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  vendor_contact_number: string;
  monthly_sales_value: number;
  client: Client;
};

export type Client = {
  id: number;
  source_of_lead: string;
  location: string;
  city: string;
  state: string;
  type_of_visit: string;
  visit: number;
  date_of_visit: string;
  client_name: string;
  firm_name: string;
  monthly_turnover: any;
  contact_number: string;
  firm_type: string;
  business_vintage: string;
  sector: string;
  bank_name: string;
  cibil_score: number;
  facility_type: string;
  existing_funding_sanctioned_amount: number;
  estimated_funding_required: number;
  credit_period_offer: number;
  client_response: any;
  intent: any;
  date_of_next_visit: any;
  reason_for_not_interested: any;
  are_you_interested_for: any;
  created_at: string;
  deleted_at: any;
  user: any;
  kyc: any;
};

export type IVisitPayload = {
  client_response: string;
  intent: string;
  date_of_next_visit: string;
  reason_for_not_interested: string;
  are_you_interested_for: string;
};

export type IvisitResponse = {
  statusCode: number;
  message: string;
};

export interface IUploadKycDocumentPayload {
  doc: {
    uri: string;
    type: string;
    name: string;
  };
  clientId: number;
  uploaded_by: string;
  params: string;
  client_name: string;
}

export interface IUploadKycDocumentResponse {
  status: boolean;
  message: string;
  data: {
    document_url: string;
  };
}

export interface IUploadPanDocumentsPayload {
  clientId: number;
  uploaded_by: string;
  doc: {
    name_as_per_pan: string;
    pan_number: string;
    dob: string;
  }[];
  files: {
    uri: string;
    type: string;
    name: string;
  }[];
}

export interface IUploadPanDocumentsResponse {
  status: boolean;
  message: string;
  data: any; // Adjust this according to real API response
}

export interface IUploadResidenceDetailsPayload {
  doc: {
    uri: string | null; // File path or URL to the image
    type: string | null; // e.g., 'image/png'
    name: string | null; // e.g., 'bhavya.png'
  };
  clientId: number;
  uploaded_by: string;
  params: string;
  client_name: string;
  name_of_owner: string;
  ownership_status: string;
}

export interface IUploadResidenceDetailsResponse {
  status: boolean;
  message: string;
  data: {
    document_url: string;
  };
}

export interface IBankListResponse {
  statusCode: number;
  data: IBankListResponseDatum[];
}

export interface IBankListResponseDatum {
  id: number;
  bank_name: string;
}

export interface UploadPanKycDocumentPayload {}

export interface IKycCheckedResponse {
  statusCode: number;
  data: IKycCheckedResponseDatum[];
}
export interface IKycCheckedResponseDatum {
  document_id: number;
  document_type: string;
}
