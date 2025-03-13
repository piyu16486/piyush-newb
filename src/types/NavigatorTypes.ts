import {Country} from 'react-native-country-picker-modal';

export type AuthNavigatorType = {
  SignupScreen:
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
  OTPInputScreen:
    | {
        signupMode: 'email';
        email: string;
      }
    | {
        signupMode: 'mobile';
        mobile: string;
        country: Country;
      };
  TermsOfService: undefined;
  Login: undefined;
};
