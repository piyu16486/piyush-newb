import {Country} from 'react-native-country-picker-modal';

export type AuthNavigatorType = {
  OnBoarding: undefined;
  SignupScreen: SignupScreenParams;
  OTPInputScreen: OTPInputScreenParams;
  SigninScreen: undefined;
  PasswordScreen: undefined;
  TermsOfService: undefined;
  SuccessScreen: undefined;
  Login: undefined;
};

export type SignupScreenParams =
  | {
      signupMode: 'email';
      email?: string;
    }
  | {
      signupMode: 'mobile';
      mobile?: string;
      country?: Country;
    }
  | undefined;

export type OTPInputScreenParams =
  | {
      signupMode: 'email';
      email: string;
    }
  | {
      signupMode: 'mobile';
      mobile: string;
      country: Country;
    };
