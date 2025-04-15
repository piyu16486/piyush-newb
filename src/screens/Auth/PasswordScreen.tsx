/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {Button, Container, Header, Input, TnCFooter} from '@components/index';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {StyleSheet, Text, View} from 'react-native';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {CircleCheck, EyeClose, EyeOpen} from '@assets/Icons';
import {Colors, Fonts} from '@constants/index';
import Toast from 'react-native-toast-message';
import {forgotPassword, verifyPasswordRequest} from '@store/auth/auth.slice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} = useRoute<RouteProp<AuthNavigatorType, 'PasswordScreen'>>();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordError = useMemo(() => {
    const error = {
      lengthError: false,
      symbolError: false,
      numberError: false,
    };
    if (password.length < 8) {
      error.lengthError = true;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      error.symbolError = true;
    }
    if (!/\d/.test(password)) {
      error.numberError = true;
    }
    return error;
  }, [password]);

  const onPressCreatePassword = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
        visibilityTime: 2000,
      });
      return;
    }

    if (
      passwordError.lengthError ||
      passwordError.symbolError ||
      passwordError.numberError
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a valid password',
        visibilityTime: 2000,
      });
      return;
    }

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
    async function getToken() {
      let token = await getData('token');
      console.log('Retrieved token:', token);
      return token; // Or use token for your further logic
    }

    // ✅ Get email from params (or decode token if you prefer)
    //const email = params.email; // make sure this is passed when navigating to this screen
    const rawToken = await AsyncStorage.getItem('token');

    if (!rawToken) {
      Toast.show({
        type: 'error',
        text1: 'Token not found. Please log in again.',
        visibilityTime: 2000,
      });
      return;
    }

    const token: string = rawToken; // now it's definitely a string

    dispatch(
      verifyPasswordRequest({
        payload: {
          token,
          password,
        },
        callbackSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Password created successfully',
            visibilityTime: 2000,
          });

          if (params.screenMode === 'createPass') {
            navigation.replace('SuccessScreen', {authMode: 'signup'});
          } else {
            navigation.replace('SuccessScreen', {authMode: 'password'});
          }
        },
        callbackError: (errorMessage: string) => {
          Toast.show({
            type: 'error',
            text1: errorMessage || 'Something went wrong',
            visibilityTime: 2000,
          });
        },
      }),
    );
  };

  const onPressSendResetLink = () => {
    console.log('Email entered: ', email);

    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Please enter your email',
        visibilityTime: 2000,
      });
      return;
    }

    dispatch(
      forgotPassword({
        payload: {email},
        callbackSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Reset link sent successfully',
            visibilityTime: 2000,
          });

          navigation.navigate('PasswordScreen', {
            screenMode: 'forgotPass',
            email: email,
          });
        },
        callbackError: errorMessage => {
          Toast.show({
            type: 'error',
            text1: 'Failed to send reset link',
            text2: errorMessage,
            visibilityTime: 2000,
          });
        },
      }),
    );
  };

  return (
    <Container>
      <Header
        title={
          params.screenMode === 'createPass'
            ? 'Create your password'
            : 'Re-set your Password'
        }
        subtitle={
          params.screenMode === 'forgotPass'
            ? 'Enter your Email Address, and you got the updates link to change the Password.'
            : 'Your password must be at least 8 characters long and \ninclude 1 symbol and 1 number.'
        }
      />

      <View style={styles.flex1}>
        {params.screenMode === 'forgotPass' ? (
          <>
            <View style={{marginHorizontal: scaleWidth(43)}}>
              <Input
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                containerStyle={{marginTop: scaleHeight(54)}}
              />
            </View>
            <Button
              buttonText="Send Reset Link"
              style={styles.buttonStyle}
              onPress={onPressSendResetLink}
            />
          </>
        ) : (
          <>
            <View style={styles.passwordContainer}>
              <Input
                label="Password"
                placeholder="Enter your password"
                renderRightIcon={
                  showPassword ? (
                    <EyeOpen height={scaleWidth(20)} width={scaleWidth(20)} />
                  ) : (
                    <EyeClose height={scaleWidth(20)} width={scaleWidth(20)} />
                  )
                }
                onPressRightIcon={() => setShowPassword(prv => !prv)}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Input
                label="Confirm Password"
                placeholder="Repeat your password"
                containerStyle={{marginTop: scaleHeight(24)}}
                renderRightIcon={
                  showConfirmPassword ? (
                    <EyeOpen height={scaleWidth(20)} width={scaleWidth(20)} />
                  ) : (
                    <EyeClose height={scaleWidth(20)} width={scaleWidth(20)} />
                  )
                }
                onPressRightIcon={() => setShowConfirmPassword(prv => !prv)}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {confirmPassword.length > 0 && (
                <Text
                  style={{
                    marginTop: scaleHeight(8),
                    marginLeft: scaleWidth(8),
                    fontSize: scaleWidth(12),
                    color: password === confirmPassword ? '#028D3E' : 'red',
                  }}>
                  {password === confirmPassword
                    ? 'Passwords match'
                    : 'Passwords do not match'}
                </Text>
              )}
            </View>

            <View style={styles.passwordInfoContainer}>
              <View style={styles.passwordInfo}>
                <CircleCheck
                  color={passwordError.lengthError ? Colors.gray400 : '#028D3E'}
                  height={scaleHeight(16)}
                  width={scaleWidth(16)}
                />
                <Text style={styles.passwordInfoText}>
                  Minimum 8 characters
                </Text>
              </View>
              <View style={styles.passwordInfo}>
                <CircleCheck
                  color={passwordError.symbolError ? Colors.gray400 : '#028D3E'}
                  height={scaleHeight(16)}
                  width={scaleWidth(16)}
                />
                <Text style={styles.passwordInfoText}>At least 1 symbol</Text>
              </View>
              <View style={styles.passwordInfo}>
                <CircleCheck
                  color={passwordError.numberError ? Colors.gray400 : '#028D3E'}
                  height={scaleHeight(16)}
                  width={scaleWidth(16)}
                />
                <Text style={styles.passwordInfoText}>At least 1 number</Text>
              </View>
            </View>

            <Button
              buttonText={
                params.screenMode === 'createPass'
                  ? 'Create Password'
                  : 'Update Password'
              }
              style={styles.buttonStyle}
              onPress={onPressCreatePassword}
            />
          </>
        )}
      </View>

      <TnCFooter navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  passwordContainer: {
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(64),
  },
  passwordInfoContainer: {
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(32),
    gap: scaleWidth(8),
  },
  passwordInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(8),
  },
  passwordInfoText: {
    fontFamily: Fonts.GilroySemiBold,
    fontSize: scaleFont(12),
    color: Colors.gray400,
  },
  buttonStyle: {marginHorizontal: scaleWidth(43), marginTop: scaleHeight(68)},
});
