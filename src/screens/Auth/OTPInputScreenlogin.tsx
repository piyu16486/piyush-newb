/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, AppState, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import Toast from 'react-native-toast-message';
import {Button, Container, Header, TnCFooter} from '@components/index';
import {EditIcon} from '@assets/Icons';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {OtpInput} from 'react-native-otp-entry';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import {signInOtpVerify} from '@store/auth/auth.slice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP_TIMER = 60;

export const OTPInputScreenlogin = () => {
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const timerInterval = useRef<NodeJS.Timeout>(null);

  async function getData(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved value:', value);
        return value;
      }
    } catch (e) {
      console.log('Failed to fetch data', e);
    }
  }
  async function getMobilenumber() {
    let mobileNumber = await getData('mobilenumber');
    console.log('Retrieved token:', mobileNumber);
    return mobileNumber; // Or use token for your further logic
  }

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} =
    useRoute<RouteProp<AuthNavigatorType, 'OTPInputScreenLogin'>>();

  const onPressEdit = () => {
    navigation.replace('SigninScreen', params);
  };

  const startTimer = () => {
    timerInterval.current = setInterval(() => {
      setOtpTimer(prv => {
        if (prv > 0) {
          return prv - 1;
        } else {
          if (timerInterval.current) {
            clearInterval(timerInterval.current);
          }
          return 0;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', state => {
      console.log(state);
    });
    startTimer();
    return () => {
      appStateSubscription.remove();
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  const onPressResendOTP = () => {
    console.log('----->>>>>');
    setOtpTimer(OTP_TIMER);
    Toast.show({
      type: 'success',
      text1: 'OTP has been sent successfully',
      visibilityTime: 2000,
    });
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
    startTimer();
  };

  const dispatch = useDispatch();

  const onPressVerifyOTP = async () => {
    const mobilenumber = (await AsyncStorage.getItem('mobilenumber')) ?? '';

    console.log('------->>>>');
    console.log('OTP entered:', otp);
    console.log('Mobile number for OTP:', params.email); // Assuming it's mobile_number

    if (otp.length < 6 || !/^\d{6}$/.test(otp)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid 6-digit OTP',
        visibilityTime: 2000,
      });
      return;
    }

    dispatch(
      signInOtpVerify({
        payload: {
          mobile_number: mobilenumber, // Replace 'email' with actual mobile_number if needed
          otp: otp,
        },
        callbackSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'OTP Verified Successfully!',
            visibilityTime: 2000,
          });
          navigation.navigate('SuccessScreen', {authMode: 'signin'});
        },
        callbackError: (errMessage: string) => {
          Toast.show({
            type: 'error',
            text1: errMessage || 'Invalid OTP',
            visibilityTime: 2000,
          });
        },
      }),
    );
  };

  return (
    <Container>
      <View style={styles.flex1}>
        <Header
          title={'Verify Email'}
          customSubtitle={
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>
                {'We Just sent a 6 Digit code to '}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.subTitle, styles.subTitleInfo]}>
                {params.email}
              </Text>
              <TouchableOpacity
                style={styles.editContainer}
                onPress={onPressEdit}>
                <EditIcon height={scaleHeight(10)} width={scaleWidth(10)} />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          }
        />
        <View style={styles.otpContainer}>
          <OtpInput
            onTextChange={setOtp}
            numberOfDigits={6}
            type="numeric"
            autoFocus={false}
            blurOnFilled={true}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              pinCodeContainerStyle: {
                borderWidth: 2,
                borderColor: Colors.gray500,
                borderRadius: 0,
                height: scaleWidth(30),
                width: scaleWidth(30),
              },
              pinCodeTextStyle: {
                fontSize: scaleFont(12),
              },
              focusedPinCodeContainerStyle: {
                borderColor: Colors.gray500,
              },
              focusStickStyle: {
                backgroundColor: Colors.primaryColor,
                height: scaleWidth(20),
              },
            }}
          />
          <Button
            buttonText={'Verify'}
            style={{marginTop: scaleHeight(20)}}
            onPress={onPressVerifyOTP}
          />
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>{'Didn’t get the OTP? '}</Text>
          <TouchableOpacity disabled={otpTimer > 0} onPress={onPressResendOTP}>
            <Text style={[styles.resendText, {color: Colors.tertiaryColor}]}>
              Resend OTP {otpTimer > 0 ? `in ${otpTimer} sec` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TnCFooter navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  subTitleContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(8),
  },
  subTitle: {
    fontSize: scaleFont(12),
    color: Colors.gray600,
    fontFamily: Fonts.GilroyMedium,
  },
  subTitleInfo: {
    color: Colors.tertiaryColor,
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: scaleWidth(12),
    gap: scaleWidth(4),
  },
  editText: {
    color: 'rgba(0, 0, 0, 0.52)',
    fontSize: scaleFont(12),
    fontFamily: Fonts.GilroyMedium,
  },
  otpContainer: {
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(119),
  },
  resendContainer: {
    marginTop: scaleHeight(40),
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: scaleWidth(32),
  },
  resendText: {
    fontFamily: Fonts.GilroyMedium,
    color: Colors.darkGray,
    fontSize: scaleFont(16),
  },
});
