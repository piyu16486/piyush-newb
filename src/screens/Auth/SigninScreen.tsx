/* eslint-disable @typescript-eslint/no-unused-vars */
import {EyeClose, EyeOpen} from '@assets/Icons';
import {Button, Container, Header, Input, TnCFooter} from '@components/index';
import {Colors, Fonts} from '@constants/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SignInPayload} from '@store/auth';
import {signinRequest} from '@store/auth/auth.slice';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {isValidEmail, isValidMobile} from '@utils/Utils';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';

export const SigninScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();

  const [signupMode] = useState<'email' | 'mobile'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [country, setCountry] = useState<Country>({
    cca2: 'IN',
    currency: ['INR'],
    callingCode: ['91'],
    region: 'Asia',
    subregion: 'Southern Asia',
    flag: 'flag-in',
    name: 'India',
  });

  const [contactInfo, setContactInfo] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = () => {
    if (!contactInfo.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
        visibilityTime: 2000,
      });
      return false;
    }
    if (!isValidEmail(contactInfo.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Email is not valid',
        visibilityTime: 2000,
      });
      return false;
    }
    Toast.show({
      type: 'success',
      text1: 'OTP sent to your email',
      visibilityTime: 2000,
    });
    return true;
  };

  const handleMobileVerification = () => {
    if (!contactInfo.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Mobile no. is required',
        visibilityTime: 2000,
      });
      return false;
    }
    if (!isValidMobile(contactInfo.trim(), country.callingCode[0])) {
      Toast.show({
        type: 'error',
        text1: 'Mobile no. is not valid',
        visibilityTime: 2000,
      });
      return false;
    }
    Toast.show({
      type: 'success',
      text1: 'OTP sent to your mobile no.',
      visibilityTime: 2000,
    });
    return true;
  };

  const dispatch = useDispatch();

  const onPressVerify = async () => {
    console.log('-------->>>>>');
    if (signupMode === 'email') {
      console.log('-------->>>>>1');
      const isEmailValid = handleEmailVerification();
      if (isEmailValid) {
        console.log('-------->>>>>2');
        const payload: SignInPayload = {
          email: contactInfo,
          password: passwordValue,
        };
        console.log('----->>>>3', payload);
        setLoading(true); // Show loader

        dispatch(
          signinRequest({
            payload,
            callbackSuccess: () => {
              console.log('Login successful. Navigating to OTP screen...');
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'OTPInputScreenLogin',
                    params: {
                      signupMode: 'email',
                      email: contactInfo,
                      showCreatePass: false,
                    },
                  },
                ],
              });
            },
            callbackError: errorMessage => {
              console.log('error', errorMessage);
              console.warn('Login failed:', errorMessage);
              // Optionally show alert or toast
              Alert.alert(
                'Login Failed',
                errorMessage || 'Something went wrong',
              );
            },
          }),
        );
      }
    }
  };

  return (
    <Container>
      <Header
        title="Welcome back to CashnTech"
        subtitle="Log In to your account"
      />
      <View style={styles.inputContainer}>
        <Input
          label={
            signupMode === 'email'
              ? 'Email Address'
              : 'Enter your Mobile Number'
          }
          renderLeftIcon={
            signupMode === 'email' ? undefined : (
              <View style={styles.countryCodeContainer}>
                <CountryPicker
                  visible={showCountryModal}
                  countryCode={country.cca2}
                  onSelect={item => {
                    setShowCountryModal(false);
                    setCountry(item);
                  }}
                  withEmoji
                  withFlag
                  withCallingCode
                  withAlphaFilter
                  withFilter
                  withFlagButton
                  withCallingCodeButton
                />
              </View>
            )
          }
          leftIconStyle={styles.leftIcon}
          onPressLeftIcon={() => {
            setShowCountryModal(prv => !prv);
          }}
          maxLength={32}
          value={contactInfo}
          onChangeText={setContactInfo}
          keyboardType={signupMode === 'email' ? 'email-address' : 'number-pad'}
        />
        <Input
          label="Password"
          onChangeText={setPassword}
          value={passwordValue}
          renderRightIcon={
            showPassword ? (
              <EyeOpen height={scaleWidth(20)} width={scaleWidth(20)} />
            ) : (
              <EyeClose height={scaleWidth(20)} width={scaleWidth(20)} />
            )
          }
          onPressRightIcon={() => setShowPassword(prv => !prv)}
          secureTextEntry={!showPassword}
          containerStyle={{marginTop: scaleHeight(24)}}
        />
        <View style={styles.extraInfoContainer}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setRememberMe(pre => !pre)}>
            <Icon
              name={rememberMe ? 'check-square' : 'square'}
              size={scaleWidth(12)}
              color={Colors.gray300}
            />

            <Text style={styles.rememberText}>
              Remember me for faster login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PasswordScreen', {screenMode: 'forgotPass'})
            }>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button buttonText="Get Verification Code" onPress={onPressVerify} />
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>{"Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => navigation.replace('SignupScreen')}>
            <Text style={[styles.accountText, styles.accountLinkText]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TnCFooter navigation={navigation} />
      {/* Activity Indicator Overlay - Show when loading */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(36),
  },
  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(8),
    alignItems: 'center',
    marginBottom: scaleHeight(47),
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  rememberText: {
    marginLeft: scaleWidth(6),
    color: Colors.gray300,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(12),
  },
  forgotPasswordText: {
    color: Colors.tertiaryColor,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(12),
  },
  accountContainer: {
    marginTop: scaleHeight(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#202325',
    fontFamily: Fonts.GilroySemiBold,
    fontSize: scaleFont(16),
  },
  accountLinkText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
  },
  countryCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: scaleWidth(4),
  },
  leftIcon: {
    borderRightWidth: scaleWidth(1.5),
    borderColor: Colors.gray300,
    height: '100%',
    flexDirection: 'row',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
