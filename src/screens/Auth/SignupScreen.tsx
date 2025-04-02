import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Container, Header, Input, TnCFooter} from '@components/index';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {Colors, Fonts} from '@constants/index';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {isValidEmail, isValidMobile} from '@utils/Utils';
import Toast from 'react-native-toast-message';

export const SignupScreen = () => {
  // Hooks
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} = useRoute<RouteProp<AuthNavigatorType, 'SignupScreen'>>();
  // States
  const [signupMode, setSignupMode] = useState<'email' | 'mobile'>('email');
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    if (params?.signupMode) {
      setSignupMode(params.signupMode);
      if (params.signupMode === 'mobile') {
        setContactInfo(params.mobile ?? '');
        setCountry(params.country ?? country);
      } else {
        setContactInfo(params.email ?? '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Functions
  const handleEmailVerification = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'First and Last Name are required',
        visibilityTime: 2000,
      });
      return false;
    }
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

  const onPressVerify = () => {
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
                showCreatePass: true,
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
                showCreatePass: true,
              },
            },
          ],
        });
      }
    }
  };

  const onPressLogin = () => {
    navigation.replace('SigninScreen');
  };

  return (
    <Container>
      <View style={styles.flex1}>
        <Header
          title="Welcome to CashnTech"
          subtitle="Unlock your Eligibility now"
        />
        <View style={styles.inputContainer}>
          <Input
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            containerStyle={{marginTop: scaleHeight(8)}}
          />
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
            keyboardType={
              signupMode === 'email' ? 'email-address' : 'number-pad'
            }
            containerStyle={{marginTop: scaleHeight(8)}}
          />
          <Input
            label="Enter Mobile No."
            renderLeftIcon={
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
            }
            leftIconStyle={styles.leftIcon}
            onPressLeftIcon={() => setShowCountryModal(prv => !prv)}
            maxLength={15}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="number-pad"
            containerStyle={{marginTop: scaleHeight(8)}}
          />
          <Button
            buttonText={
              signupMode === 'email' ? 'Get Verification Code' : 'Get OTP'
            }
            style={{marginTop: scaleHeight(35)}}
            onPress={onPressVerify}
          />
          {/* <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View> */}

          {/* <Button
            buttonText={
              signupMode === 'email'
                ? 'Continue with Mobile No.'
                : 'Continue with Email ID'
            }
            mode="outlined"
            style={{marginTop: scaleHeight(24)}}
            onPress={() => {
              if (signupMode === 'email') {
                setSignupMode('mobile');
              } else {
                setSignupMode('email');
              }
              setContactInfo('');
            }}
          /> */}

          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Already have an account? </Text>
            <TouchableOpacity onPress={onPressLogin}>
              <Text style={[styles.accountText, styles.accountLinkText]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TnCFooter navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  inputContainer: {
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(64),
  },
  // dividerContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: scaleHeight(35),
  // },
  // divider: {
  //   flex: 1,
  //   height: scaleHeight(2),
  //   backgroundColor: '#CED0CE',
  //   borderRadius: 10,
  // },
  // dividerText: {
  //   marginHorizontal: scaleWidth(10),
  //   color: Colors.lightGray,
  //   lineHeight: scaleFont(14),
  //   fontSize: scaleFont(14),
  //   fontFamily: Fonts.GilroyMedium,
  // },
  accountContainer: {
    marginTop: scaleHeight(24),
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
