import {View, Text, TouchableOpacity, StyleSheet, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Header, TnCFooter} from '@components/index';
import {OtpInput} from 'react-native-otp-entry';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {Colors, Fonts} from '@constants/index';
import {EditIcon} from '@assets/Icons';
import Toast from 'react-native-toast-message';
import {passwordRequest} from '@store/auth/auth.slice';
import {useDispatch} from 'react-redux';

const OTP_TIMER = 60;

export const OTPInputScreen = () => {
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(OTP_TIMER);
  const timerInterval = useRef<NodeJS.Timeout>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} = useRoute<RouteProp<AuthNavigatorType, 'OTPInputScreen'>>();

  const onPressEdit = () => {
    navigation.replace('SignupScreen', params);
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

  const onPressVerifyOTP = () => {
    console.log('------->>>>');
    console.log('OTP entered:', otp);
    console.log('Email for OTP:', params.email);

    if (otp.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid OTP',
        visibilityTime: 2000,
      });
      return;
    }
    dispatch(
      passwordRequest({
        payload: {
          email: params.email, // or route.params.email
          otp: otp,
        },
        callbackSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'OTP verified successfully',
            visibilityTime: 2000,
          });

          if (params.showCreatePass) {
            navigation.navigate('PasswordScreen', {screenMode: 'createPass'});
          } else {
            navigation.replace('SuccessScreen', {authMode: 'signin'});
          }
        },
        callbackError: (errMsg: string) => {
          Toast.show({
            type: 'error',
            text1: errMsg || 'Wrong OTP. Please try again',
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
          title={'Verify your Mobile no.'}
          customSubtitle={
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>
                {'We Just sent a 6 Digit code to '}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.subTitle, styles.subTitleInfo]}>
                {`+${params.country.callingCode[0]} ${params.mobile}`}
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
