import {Country} from 'react-native-country-picker-modal';

export type AuthNavigatorType = {
  OnBoarding: undefined;
  SignupScreen: SignupScreenParams;
  OTPInputScreen: OTPInputScreenParams;
  SigninScreen: undefined;
  PasswordScreen: {
    screenMode: 'forgotPass' | 'createPass';
  };
  TermsOfService: undefined;
  SuccessScreen: {
    authMode: 'signin' | 'signup' | 'password';
  };
  Login: undefined;
};

export type SignupScreenParams = {
  email: string;
  mobile: string;
  country: Country;
  firstName: string;
  lastName: string;
};

export type OTPInputScreenParams = {
  email: string;
  mobile: string;
  country: Country;
  showCreatePass: boolean;
  firstName: string;
  lastName: string;
};

export type HomeNavigatorType = {
  ClientNavigator: undefined;
  SoftNavigator: undefined;
  LeadNavigator: undefined;
  ReportNavigator: undefined;
  KycNavigator: undefined;
  DocNavigator: undefined;
};

export type ClientNavigatorType = {
  ClientInfo: undefined;
  FormSelectionScreen: undefined;
  InputFormField: {
    screen:
      | 'BasicDetails'
      | 'ClientFirmScreen'
      | 'VendorScreen'
      | 'VisitScreen';
    title:
      | 'Basic Details'
      | 'Client & Firm Details'
      | 'Vendor Details'
      | 'Visit Details';
  };
  ClientLeadInfoTab: undefined;
  ClientCardReadMore: undefined;
};

export type SoftNavigatorType = {
  Softsanction: undefined;
  SoftsanctionProcess: undefined;
  SoftSanctionRuleset: undefined;
  RulesetTCPD: undefined;
  UGROTurnoverMethod: undefined;
  UGROPurchaseMethod: undefined;
};

export type LeadNavigatorType = {
  LeadProgress: undefined;
  LeadProgressInfo: undefined;
};

export type ReportNavigatorType = {
  Report: undefined;
};

export type KycNavigatorType = {
  KycDocument: undefined;
  KYCFormSelection: undefined;
  KycUploadDoc: undefined;
  KycUploadPan: undefined;
  KycUploadAdhar: undefined;
  ResidenceDetail: undefined;
  KycElectricityBill: undefined;
  KycOwner: undefined;
  UdhyamCertificate: undefined;
  GSTDocument: undefined;
  GodownDetails: undefined;
  GodownDetails2: undefined;
  CompanyPanCard: undefined;
  ShareholdingCompany: undefined;
  CompanyDocument: undefined;
  UploadScreen: undefined;
};

export type DocNavigatorType = {
  DocumentValidation: undefined;
  DocValidForm: undefined;
  DocValidSelection: undefined;
  PersonalKYCValidation: undefined;
  BusinessKYCValidation: undefined;
};
