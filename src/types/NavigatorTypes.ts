import {
  FormTitlesType,
  FormTypes,
} from '@screens/CreateClientForm/CreateClientForm.type';
import {Country} from 'react-native-country-picker-modal';

export type AuthNavigatorType = {
  OnBoarding: undefined;
  SignupScreen: SignupScreenParams | undefined;
  OTPInputScreen: OTPInputScreenParams;
  PasswordScreen: PasswordScreenParams;

  SigninScreen: SigninScreenParams | undefined;
  TermsOfService: undefined;
  SuccessScreen: {
    authMode: 'signin' | 'signup' | 'password';
  };
};

export type SignupScreenParams = {
  email: string;
  mobile: string;
  country: Country;
  firstName: string;
  lastName: string;
};

export type SigninScreenParams = {
  email: string;
  password: string;
};

export type OTPInputScreenParams = {
  showCreatePass: boolean;
} & (
  | {
      screen: 'signup';
      data: SignupScreenParams;
    }
  | {
      screen: 'signin';
      data: SigninScreenParams;
    }
);

export type PasswordScreenParams = {
  token?: string;
  screenMode?: 'forgotPass' | 'createPass';
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
  CreateClientForm: {
    screen: FormTypes;
    title: FormTitlesType;
  };
  ClientLeadInfoTab: {clientId: number};
  ClientCardReadMore: undefined;
};

export type SoftNavigatorType = {
  Softsanction: undefined;
  SoftsanctionProcess: undefined;
  SoftSanctionRuleset: {
    bankName?: string;
    product?: string;
    configRules?: any[];
    clientName?: string;
    clientId?: string;
  } | undefined;
  RulesetTCPD: undefined;
  UGROTurnoverMethod: undefined;
  UGROPurchaseMethod: undefined;
  RulesetView: {
    rulesetData: any[];
    bankName?: string;
    productName?: string;
    rulesetId?: string;
    methodName?: string;
  } | undefined;
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
  KYCFormSelection: {clientID: number};
  KycUploadDoc: {clientID: number};
  KycUploadPan: {clientID: number};
  KycUploadAdhar: {clientID: number};
  ResidenceDetail: {clientID: number};
  KycElectricityBill: undefined;
  KycOwner: undefined;
  UdhyamCertificate: undefined;
  GSTDocument: undefined;
  GodownDetails: undefined;
  GodownDetails2: undefined;
  CompanyPanCard: undefined;
  ShareholdingCompany: undefined;
  CompanyDocument: undefined;
};

export type DocNavigatorType = {
  DocumentValidation: undefined;
  DocValidForm: undefined;
  DocValidSelection: undefined;
  PersonalKYCValidation: undefined;
  BusinessKYCValidation: undefined;
  TaskLogTabs: undefined;
};
