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
