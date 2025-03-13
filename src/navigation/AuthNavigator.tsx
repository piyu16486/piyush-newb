import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OTPInputScreen, SignupScreen, TermsOfService} from '@screens/index';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import React from 'react';

const AuthStack = createNativeStackNavigator<AuthNavigatorType>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="OTPInputScreen" component={OTPInputScreen} />
      <AuthStack.Screen name="TermsOfService" component={TermsOfService} />
    </AuthStack.Navigator>
  );
};
