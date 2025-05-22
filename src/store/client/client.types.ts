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

  reportLoader: boolean;
  reportList: Array<IRemarkReportResponseDatum>;

  leadLoader: boolean;
  leadList: Array<ILeadProgressResponseDatum>;

  TaskHistoryLoader: boolean;
  TaskHistoryList: Array<ITaskHistoryResponseDatum>;

  basicLoader: boolean;
  clientId: null;
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

export interface BasicDetailPayload {
  source_of_lead: string;
  location: string;
  city: string;
  state: string;
  type_of_visit: string;
  visit: number;
  date_of_visit: string;
}

export interface IbasicDetailResponse {
  statusCode: number;
  message: string;
  data: number;
}
