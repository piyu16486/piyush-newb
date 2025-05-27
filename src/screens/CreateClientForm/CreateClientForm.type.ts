import Cities from '@constants/Cities';
import {ClientScreens} from '@constants/Screens';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps, RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';

// Navigation Types
export type NavigationType = CompositeScreenProps<
  NativeStackScreenProps<ClientNavigatorType>,
  DrawerScreenProps<HomeNavigatorType>
>;

export type CreateClientFormProps = {
  navigation: NavigationType['navigation'];
  route: RouteProp<ClientNavigatorType, ClientScreens.CreateClientForm>;
};

// Types
export type FormTypes = keyof typeof formTitles;
export type FormTitlesType = (typeof formTitles)[FormTypes];
export enum FieldType {
  INPUT = 'input',
  DROPDOWN = 'dropdown',
  DATE = 'date',
}
// Name TYpes
type BasicDetailsDropDownNames =
  | 'sourceOfLead'
  | 'city'
  | 'state'
  | 'typeOfVisit';
type BasicDetailsInputNames = 'location' | 'dateOfVisit' | 'visitNumber';
export type BasicDetailsNames =
  | BasicDetailsDropDownNames
  | BasicDetailsInputNames;
type ClientFirmDropDownNames = 'typeOfFirm' | 'sector' | 'facilityType';
type ClientFirmInputNames =
  | 'clientName'
  | 'firmName'
  | 'contactNumber'
  | 'businessVintage'
  | 'cibilScore'
  | 'existingFunding'
  | 'estimatedFunding'
  | 'creditPeriod'
  | 'bankName';
export type ClientFirmNames = ClientFirmDropDownNames | ClientFirmInputNames;

type VendorDropDownNames = '';
type VendorInputNames =
  | 'product'
  | 'vendorName'
  | 'vendorContact'
  | 'vendorEmail'
  | 'monthlySales';
export type VendorNames = VendorDropDownNames | VendorInputNames;

type VisitDropDownNames = 'intent';
type VisitInputNames =
  | 'visitRemarks'
  | 'nextVisitDate'
  | 'reason'
  | 'interested';
export type VisitNames = VisitDropDownNames | VisitInputNames;

// Form Data Type
type BasicDetailsTypes =
  | {
      label: string;
      name: BasicDetailsDropDownNames;
      type: FieldType.DROPDOWN;
    }
  | {
      label: string;
      name: BasicDetailsInputNames;
      type: FieldType.INPUT | FieldType.DATE;
    };

export type ClientFirmScreenTypes =
  | {
      label: string;
      name: ClientFirmDropDownNames;
      type: FieldType.DROPDOWN;
    }
  | {
      label: string;
      name: ClientFirmInputNames;
      type: FieldType.INPUT | FieldType.DATE;
    };

export type VendorScreenTypes =
  | {
      label: string;
      name: VendorDropDownNames;
      type: FieldType.DROPDOWN;
    }
  | {
      label: string;
      name: VendorInputNames;
      type: FieldType.INPUT;
    };

export type VisitScreenTypes =
  | {
      label: string;
      name: VisitDropDownNames;
      type: FieldType.DROPDOWN;
    }
  | {
      label: string;
      name: VisitInputNames;
      type: FieldType.INPUT | FieldType.DATE;
    };

// Combined Types
export type DataFieldsType =
  | BasicDetailsTypes
  | ClientFirmScreenTypes
  | VendorScreenTypes
  | VisitScreenTypes;
export type FormInputListType = {
  BasicDetails: Array<BasicDetailsTypes>;
  ClientFirmScreen: Array<ClientFirmScreenTypes>;
  VendorScreen: Array<VendorScreenTypes>;
  VisitScreen: Array<VisitScreenTypes>;
};

//

export type DropDownDataType = Record<
  | BasicDetailsDropDownNames
  | ClientFirmDropDownNames
  | VendorDropDownNames
  | VisitDropDownNames,
  Array<{label: string; value: string}>
>;

// Dropdown Enums
export enum LeadSourceType {
  MARKET_KNOWLEDGE = 'Market Knowledge (D)',
  CUSTOMER_REFERENCE = 'Customer Reference (C)',
  TELECALLING = 'Telecalling (H)',
  OUTSOURCED_AGENCY = 'Outsourced Agency (H)',
  CHARETRED_ACCOUNTANT = 'Chartered Accountant (A)',
  INSURANCE = 'Insurance (I)',
  WEALTH_AND_INVESTMENT = 'Wealth & Investment (W)',
}

export enum StateType {
  GUJARAT = 'Gujarat',
  MAHARASHTRA = 'Maharashtra',
}

export enum VisitType {
  NEW = 'New',
  REPEAT = 'Repeat',
}

export enum FirmType {
  COMPANY = 'Company',
  PARTNERSHIP = 'Partnership',
  SOLE_PROPRIETERSHIP = 'Sole Proprietership',
  HUF = 'HUF',
}

export enum SectorType {
  FMCG = 'FMCG',
  PAINT = 'Paint',
  MANUFACTURING = 'Manufacturing',
  PHARMA = 'Pharma',
  ELECTRONIC = 'Electronic',
}

export enum FacilityType {
  OD = 'OD - Overdraft',
  CC = 'CC - Cash Credit',
  WCTL = 'WCTL - Working Capital Term Loan',
  CF = 'CF - Cashn Flow',
  OTHERS = 'Others',
}

export enum IntentType {
  HIGH = 'High',
  LOW = 'Low',
  MEDIUM = 'Medium',
}

// Dropdown Data
const sourceOfLead = [
  {
    label: LeadSourceType.MARKET_KNOWLEDGE,
    value: LeadSourceType.MARKET_KNOWLEDGE,
  },
  {
    label: LeadSourceType.CUSTOMER_REFERENCE,
    value: LeadSourceType.CUSTOMER_REFERENCE,
  },
  {label: LeadSourceType.TELECALLING, value: LeadSourceType.TELECALLING},
  {
    label: LeadSourceType.OUTSOURCED_AGENCY,
    value: LeadSourceType.OUTSOURCED_AGENCY,
  },
  {
    label: LeadSourceType.CHARETRED_ACCOUNTANT,
    value: LeadSourceType.CHARETRED_ACCOUNTANT,
  },
  {label: LeadSourceType.INSURANCE, value: LeadSourceType.INSURANCE},
  {
    label: LeadSourceType.WEALTH_AND_INVESTMENT,
    value: LeadSourceType.WEALTH_AND_INVESTMENT,
  },
];

const state = [
  {label: StateType.GUJARAT, value: StateType.GUJARAT},
  {label: StateType.MAHARASHTRA, value: StateType.MAHARASHTRA},
];

const typeOfVisit = [
  {label: VisitType.NEW, value: VisitType.NEW},
  {label: VisitType.REPEAT, value: VisitType.REPEAT},
];

const typeOfFirm = [
  {label: FirmType.COMPANY, value: FirmType.COMPANY},
  {label: FirmType.PARTNERSHIP, value: FirmType.PARTNERSHIP},
  {label: FirmType.SOLE_PROPRIETERSHIP, value: FirmType.SOLE_PROPRIETERSHIP},
  {label: FirmType.HUF, value: FirmType.HUF},
];

const sector = [
  {label: SectorType.FMCG, value: SectorType.FMCG},
  {label: SectorType.PAINT, value: SectorType.PAINT},
  {label: SectorType.MANUFACTURING, value: SectorType.MANUFACTURING},
  {label: SectorType.PHARMA, value: SectorType.PHARMA},
  {label: SectorType.ELECTRONIC, value: SectorType.ELECTRONIC},
];

const facilityType = [
  {label: FacilityType.OD, value: FacilityType.OD},
  {label: FacilityType.CC, value: FacilityType.CC},
  {label: FacilityType.WCTL, value: FacilityType.WCTL},
  {label: FacilityType.CF, value: FacilityType.CF},
  {label: FacilityType.OTHERS, value: FacilityType.OTHERS},
];

const intent = [
  {label: IntentType.HIGH, value: IntentType.HIGH},
  {label: IntentType.LOW, value: IntentType.LOW},
  {label: IntentType.MEDIUM, value: IntentType.MEDIUM},
];

// Combined Dropdown Data
export const dropDownData: DropDownDataType = {
  sourceOfLead: sourceOfLead,
  state: state,
  city: [...Cities.Gujarat, ...Cities.Maharashtra],
  typeOfVisit: typeOfVisit,
  typeOfFirm: typeOfFirm,
  sector: sector,
  facilityType: facilityType,
  product: [],
  intent: intent,
  interested: [],
};

// Form Titles
export const formTitles = {
  BasicDetails: 'Basic Details',
  ClientFirmScreen: 'Client & Firm Details',
  VendorScreen: 'Vendor Details',
  VisitScreen: 'Visit Details',
} as const;

// All Form Data
export const formInputDetails: FormInputListType = {
  BasicDetails: [
    {label: 'Source of Lead', name: 'sourceOfLead', type: FieldType.DROPDOWN},
    {label: 'Location', name: 'location', type: FieldType.INPUT},
    {label: 'City', name: 'city', type: FieldType.DROPDOWN},
    {label: 'State', name: 'state', type: FieldType.DROPDOWN},
    {label: 'Type of Visit', name: 'typeOfVisit', type: FieldType.DROPDOWN},
    {label: 'Visit Number', name: 'visitNumber', type: FieldType.INPUT},
    {label: 'Date of Visit', name: 'dateOfVisit', type: FieldType.DATE},
  ],
  ClientFirmScreen: [
    {label: 'Name of Client', name: 'clientName', type: FieldType.INPUT},
    {label: 'Firm Name', name: 'firmName', type: FieldType.INPUT},
    {label: 'Contact number', name: 'contactNumber', type: FieldType.INPUT},
    {label: 'Type of Firm', name: 'typeOfFirm', type: FieldType.DROPDOWN},
    {label: 'Business Vintage', name: 'businessVintage', type: FieldType.INPUT},
    {label: 'Sector', name: 'sector', type: FieldType.DROPDOWN},
    {label: 'Bank Name', name: 'bankName', type: FieldType.INPUT},
    {label: 'CIBIL Score', name: 'cibilScore', type: FieldType.INPUT},
    {label: 'Facility Type', name: 'facilityType', type: FieldType.DROPDOWN},
    {
      label: 'Existing Funding Sanctioned Amt',
      name: 'existingFunding',
      type: FieldType.INPUT,
    },
    {
      label: 'Estimated Funding Required',
      name: 'estimatedFunding',
      type: FieldType.INPUT,
    },
    {label: 'Credit Period Offer', name: 'creditPeriod', type: FieldType.INPUT},
  ],
  VendorScreen: [
    {label: 'Product', name: 'product', type: FieldType.INPUT},
    {label: 'Vendor Name', name: 'vendorName', type: FieldType.INPUT},
    {
      label: 'Vendor Contact number',
      name: 'vendorContact',
      type: FieldType.INPUT,
    },
    {label: 'Vendor Contact Email', name: 'vendorEmail', type: FieldType.INPUT},
    {label: 'Monthly Sales Value', name: 'monthlySales', type: FieldType.INPUT},
  ],
  VisitScreen: [
    {label: 'Intent', name: 'intent', type: FieldType.DROPDOWN},
    {label: 'Visit Remarks', name: 'visitRemarks', type: FieldType.INPUT},
    {label: 'Date of Next Visit', name: 'nextVisitDate', type: FieldType.DATE},
    {label: 'Reason for Not Interested', name: 'reason', type: FieldType.INPUT},
    {
      label: 'Are you interested for?',
      name: 'interested',
      type: FieldType.INPUT,
    },
  ],
};

// All Form Names in Array
export const formNames = Object.keys(formInputDetails) as Array<FormTypes>;
