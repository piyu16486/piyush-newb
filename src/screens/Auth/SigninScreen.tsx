import {Button, Container, Header, Input, TnCFooter} from '@components/index';
import {Colors, Fonts} from '@constants/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {isValidEmail, isValidMobile} from '@utils/Utils';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';

export const SigninScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();

  const [signupMode] = useState<'email' | 'mobile'>('email');
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
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

  const onPressVerify = async () => {
    if (signupMode === 'email') {
      const isEmailValid = handleEmailVerification();
      if (isEmailValid) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'OTPInputScreen',
              params: {
                signupMode: 'email',
                email: contactInfo,
                showCreatePass: false,
              },
            },
          ],
        });
      }
    } else {
      const isMobileValid = handleMobileVerification();
      if (isMobileValid) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'OTPInputScreen',
              params: {
                signupMode: 'mobile',
                mobile: contactInfo,
                country: country,
                showCreatePass: false,
              },
            },
          ],
        });
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
              ? 'Enter your Email Address'
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
          value={password}
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
});
