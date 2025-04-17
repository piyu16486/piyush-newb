import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {signupRequest} from '@store/auth/auth.slice';
import {userSelector} from '@store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const dispatch = useDispatch();
  const userType = useSelector(userSelector.getUserType);

  useEffect(() => {
    if (params) {
      setEmail(params.email);
      setFirstName(params.firstName);
      setLastName(params.lastName);
      setMobileNumber(params.mobile);
      setCountry(params.country);
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

  const [loading, setLoading] = useState(false);

  const onSuccessSignup = () => {
    setLoading(false);
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
  };

  const onErrorSignup = (errorMessage: string) => {
    setLoading(false);

    Toast.show({
      type: 'error',
      text1: errorMessage,
      visibilityTime: 2000,
    });
  };

  function storeMobilenumber(key: any, value: any) {
    try {
      AsyncStorage.setItem(key, value)
        .then(() => {
          console.log('Data stored successfully');
        })
        .catch(e => {
          console.log('Failed to save data', e);
        });
    } catch (e) {
      console.log('Unexpected error', e);
    }
  }

  const onPressVerify = () => {
    const isMobileValid = handleMobileVerification();
    const isEmailValid = handleEmailVerification();
    const isNameValid = handleNameVerifications();
    storeMobilenumber('mobilenumber', mobileNumber);
    if (isEmailValid && isMobileValid && isNameValid) {
      setLoading(true); // Show loader
      dispatch(
        signupRequest({
          payload: {
            country_code: country.callingCode[0],
            mobile_number: mobileNumber,
            email,
            first_name: firstName,
            last_name: lastName,
            is_client: userType === 'client',
            is_internal: userType === 'internal',
          },
          callbackSuccess: onSuccessSignup,
          callbackError: onErrorSignup,
        }),
      );
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
