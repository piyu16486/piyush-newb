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
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    if (params) {
      setEmail(params.email ?? email);
      setFirstName(params.firstName ?? firstName);
      setLastName(params.lastName ?? lastName);
      setMobileNumber(params.mobile ?? mobileNumber);
      setCountry(params.country ?? country);
    }
  }, [params]);

  // Functions
  const handleNameVerifications = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Name is required',
        visibilityTime: 2000,
      });
      return false;
    }
    if (firstName.length < 2 || lastName.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Name is too short',
        visibilityTime: 2000,
      });
      return false;
    }
    return true;
  };
  const handleEmailVerification = () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
        visibilityTime: 2000,
      });
      return false;
    }
    if (!isValidEmail(email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Email is not valid',
        visibilityTime: 2000,
      });
      return false;
    }
    return true;
  };
  const handleMobileVerification = () => {
    if (!mobileNumber.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Mobile no. is required',
        visibilityTime: 2000,
      });
      return false;
    }
    if (!isValidMobile(mobileNumber.trim(), country.callingCode[0])) {
      Toast.show({
        type: 'error',
        text1: 'Mobile no. is not valid',
        visibilityTime: 2000,
      });
      return false;
    }
    return true;
  };

  const onPressVerify = () => {
    const isMobileValid = handleMobileVerification();
    const isEmailValid = handleEmailVerification();
    const isNameValid = handleNameVerifications();
    if (isEmailValid && isMobileValid && isNameValid) {
      Toast.show({
        type: 'success',
        text1: 'OTP sent to your mobile no.',
        visibilityTime: 2000,
      });

      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'OTPInputScreen',
            params: {
              mobile: mobileNumber,
              showCreatePass: true,
              email,
              country,
              firstName,
              lastName,
            },
          },
        ],
      });
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
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input
            label="Email Address"
            maxLength={32}
            value={email}
            onChangeText={setEmail}
            keyboardType={'email-address'}
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input
            label="Mobile No."
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
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Button
            buttonText={'Get Verification Code'}
            style={{marginTop: scaleHeight(35)}}
            onPress={onPressVerify}
          />

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
    marginTop: scaleHeight(50),
  },
  accountContainer: {
    marginTop: scaleHeight(21),
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
