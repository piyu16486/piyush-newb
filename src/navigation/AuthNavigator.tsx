import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { EmailSignupScreen } from '@screens/index';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import React from 'react';

const AuthStack = createNativeStackNavigator<AuthNavigatorType>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        name="EmailSignupScreen"
        component={EmailSignupScreen}
      />
    </AuthStack.Navigator>
  );
};
