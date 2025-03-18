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
      showCreatePass: boolean;
    }
  | {
      signupMode: 'mobile';
      mobile: string;
      country: Country;
      showCreatePass: boolean;
    };

export type HomeNavigatorType = {
  ClientInfo: undefined;
};
