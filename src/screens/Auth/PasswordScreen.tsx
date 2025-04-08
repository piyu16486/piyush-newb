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

export const PasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} = useRoute<RouteProp<AuthNavigatorType, 'PasswordScreen'>>();

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

  const dispatch = useAppDispatch();

  const onPressCreatePassword = () => {
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
    if (params.screenMode === 'createPass') {
      navigation.replace('SuccessScreen', {authMode: 'signup'});
    } else {
      navigation.replace('SuccessScreen', {authMode: 'password'});
    }
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
          'Your password must be at least 8 characters long and \ninclude 1 symbol and 1 number.'
        }
      />
      <View style={styles.flex1}>
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
              <EyeClose height={scaleWidth(20)} width={scaleWidth(20)} />
            }
            onPressRightIcon={() => setShowConfirmPassword(prv => !prv)}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {/* Password match message */}
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
            <Text style={styles.passwordInfoText}>Minimum 8 characters</Text>
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
