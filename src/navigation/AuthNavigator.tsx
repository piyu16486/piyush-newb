import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  OTPInputScreen,
  PasswordScreen,
  SigninScreen,
  SignupScreen,
  SuccessScreen,
  TermsOfService,
} from '@screens/index';
import {OnBoarding} from '@screens/OnBoarding/OnBoarding';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import React from 'react';

const AuthStack = createNativeStackNavigator<AuthNavigatorType>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="OnBoarding" component={OnBoarding} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="SigninScreen" component={SigninScreen} />
      <AuthStack.Screen name="OTPInputScreen" component={OTPInputScreen} />
      <AuthStack.Screen name="PasswordScreen" component={PasswordScreen} />
      <AuthStack.Screen name="SuccessScreen" component={SuccessScreen} />
      <AuthStack.Screen name="TermsOfService" component={TermsOfService} />
    </AuthStack.Navigator>
  );
};
