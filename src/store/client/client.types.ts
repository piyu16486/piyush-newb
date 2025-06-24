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

  // Aadhar Upload
  adharLoading: boolean;
  adharData: IUploadAdharDocumentResponse | null;
  adharError: string | null;

  // Residence Upload
  residenceLoading: boolean;
  residenceData: IUploadResidenceDetailsResponse | null;
  residenceError: string | null;

  // Udhyam Upload
  udhyamLoading: boolean;
  udhyamData: IUploadUdhyamResponse | null;
  udhyamError: string | null;

  // Gst Upload
  gstDocLoading: boolean;
  gstDocData: IUploadGstResponse | null;
  gtsDocError: string | null;

  // GoDown Upload
  goDownLoading: boolean;
  goDownData: IUploadGodDownDetailsResponse | null;
  goDownError: string | null;

  // Shareholding Upload
  ShareholdingLoading: boolean;
  ShareholdingData: IUploadShareholdingResponse | null;
  ShareholdingError: string | null;

  // CompanyPan Upload
  CompanyPanLoading: boolean;
  CompanyPanData: IuplaodCompanyPanResponse | null;
  CompanyPanError: string | null;

  // CompanyInfo Upload
  CompanyInfoLoading: boolean;
  CompanyInfoData: IUploadCompanyInfoResponse | null;
  CompanyInfoError: string | null;

  // Bank List
  BankLoader: boolean;
  BankList: Array<IBankListResponseDatum>;

  // Kyc Checked Mark
  KycCheckedLoader: boolean;
  kycCheckedList: Array<IKycCheckedResponseDatum>;

  // SoftSanction Bank Method
  SoftSanctionLoading: boolean;
  SoftSanctionData: Array<IsoftSanctionMethodDatum>;
  SoftSanctionError: string | null;

  // SoftSanction Bank Product
  SoftSanctionBNKPROLoading: boolean;
  SoftSanctionBNKPROData: Array<IsoftSanctionBankProductDatum>;
  SoftSanctionBNKPROError: string | null;

  // FilterBox
  FilterboxLoading: boolean;
  FilterboxData: IFilterResponse | null;
  FilterboxError: string | null;

  rulesetLoading: boolean;
  rulesetData: ISoftSanctionRuleset[];
  rulesetError: string | null;
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
  reference_details: any;
  monthly_turnover: any;
  financier_name: any;
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

export interface ILeadProgressResponseDatum {
  id: number;
  source_of_lead: string;
  location: string;
  client_name: any;
  monthly_turnover: any;
  bank_name: any;
  estimated_funding_required: any;
  user: any;
  report: Array<{id: number; client: number; created_at: string}>;
}

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
  data: any;
}

export interface IUploadAdharDocumnetsPayload {
  clientId: number;
  uploaded_by: string;
  doc: {
    name_as_per_aadhar: string;
    aadhar_number: string;
  }[];
  files: {
    uri: string;
    type: string;
    name: string;
  }[];
}

export interface IUploadAdharDocumentResponse {
  status: boolean;
  message: string;
  data: any;
}

export interface IUploadResidenceDetailsPayload {
  doc: {
    uri: string | null;
    type: string | null;
    name: string | null;
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

export interface IUploadUdhyamPayload {
  doc: {
    uri: string;
    type: string;
    name: string;
  }[];
  clientId: number;
  uploaded_by: string;
  docDetails: {
    name_as_per_udhyam: string;
    urn_number: string;
  };
}

export interface IUploadUdhyamResponse {
  status: boolean;
  message: string;
  data: {
    document_urls: {
      url: string;
      name: string;
    }[];
    docDetails: {
      name_as_per_udhyam: string;
      urn_number: string;
    };
  };
}

export interface IUploadGstPayload {
  doc: {
    uri: string;
    type: string;
    name: string;
  };
  clientId: number;
  uploaded_by: string;
  name_as_per_gst: string;
  gst_number: string;
  params: string;
}

export interface IUploadGstResponse {
  status: boolean;
  message: string;
  data: {
    document_urls: {
      url: string;
      name: string;
    }[];
    docDetails: {
      name_as_per_gst: string;
      gst_number: string;
    };
  };
}

export interface IUploadGoDownDetailsPayload {
  doc: {
    uri: string | null;
    type: string | null;
    name: string | null;
  };
  clientId: number;
  uploaded_by: string;
  params: string;
  client_name: string;
  name_of_owner: string;
  ownership_status: string;
}

export interface IUploadGodDownDetailsResponse {
  status: boolean;
  message: string;
  data: {
    document_url: string;
  };
}

export interface IUploadShareholdingPayload {
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

export interface IUploadShareholdingResponse {
  status: boolean;
  messsage: string;
  data: {
    document_url: string;
  };
}

export interface IuploadCompanyPanPayload {
  doc: {
    uri: string;
    type: string;
    name: string;
  }[]; // Array of 2 files
  clientId: number;
  uploaded_by: string;
  docDetails: {
    name_as_per_pan: string;
    pan_number: string;
  };
}

export interface IuplaodCompanyPanResponse {
  status: boolean;
  message: string;
  data: {
    document_urls: {
      url: string;
      name: string;
    }[];
    docDetails: {
      name_as_per_pan: string;
      pan_number: string;
    };
  };
}

export interface IUploadCompanyInfoPayload {
  clientId: number;
  uploaded_by: string;
  doc: {
    uri: string;
    type: string;
    name: string;
  }[];
}

export interface IUploadCompanyInfoResponse {
  status: boolean;
  message: string;
  data: {
    uploaded_urls: {
      url: string;
      name: string;
    }[];
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

export interface IKycCheckedResponse {
  statusCode: number;
  data: IKycCheckedResponseDatum[];
}
export interface IKycCheckedResponseDatum {
  document_id: number;
  document_type: string;
}

export interface ISoftSanctionPayload {
  bank_name: string;
  product_name: string;
  method_name: string;
  done_by: string;
}

export interface ISoftSanctionResponse {
  statusCode: number;
  data: IsoftSanctionMethodDatum[];
}

export interface IsoftSanctionMethodDatum {
  id: number;
  method_name: string;
  label: string;
}

export interface IsoftSanctionBankProductResponse {
  statusCode: number;
  data: IsoftSanctionBankProductDatum[];
}

export interface IsoftSanctionBankProductDatum {
  soft_sanction_ruleset_id: string;
  method_name: string;
}

export interface IFilterPayload {
  locations: string[];
  firstNames: any[];
  lastNames: any[];
  sourceOfLead: any[];
}

export interface IFilterResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface ISoftSanctionRuleset {
  bank_name: string;
  method_name: string;
  product_name: string;
  rules: { label: string; value: string | null }[];
}

export interface ISoftSanctionRulesetResponse {
  statusCode: number;
  data: ISoftSanctionRuleset[];
}