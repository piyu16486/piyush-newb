import {Country} from 'react-native-country-picker-modal';

export type AuthNavigatorType = {
  OnBoarding: undefined;
  SignupScreen: SignupScreenParams | undefined;
  OTPInputScreen: OTPInputScreenParams;
  OTPInputScreenLogin: OTPInputScreenLoginParams;
  SigninScreen: SigninScreenParams | undefined;
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

export type SigninScreenParams = {
  email: string;
  password: string;
};

export type OTPInputScreenParams = {
  showCreatePass: boolean;
} & SignupScreenParams;

export type OTPInputScreenLoginParams = {
  showCreatePass: boolean;
} & SigninScreenParams;

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
};
