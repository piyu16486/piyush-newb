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
  SoftsanctionProcess: undefined;
  SoftSanctionRuleset: undefined;
  RulesetTCPD: undefined;
  UGROTurnoverMethod: undefined;
  UGROPurchaseMethod: undefined;
  LeadProgress: undefined;
  LeadProgressInfo: undefined;
  Report: undefined;
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
  KycDocument: undefined;
  KYCFormSelection: undefined;
  ShareholdingCompany: undefined;
  CompanyDocument: undefined;
};

export type SoftNavigatorType = {
  Softsanction: undefined;
};
