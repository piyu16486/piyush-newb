import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ClientInfo,
  ClientLeadInfoTab,
  FormSelectionScreen,
  InputFormField,
} from '@screens/index';
import {ClientNavigatorType} from '@type/NavigatorTypes';

const Stack = createNativeStackNavigator<ClientNavigatorType>();

export const ClientNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientInfo" component={ClientInfo} />
      <Stack.Screen
        name="FormSelectionScreen"
        component={FormSelectionScreen}
      />
      <Stack.Screen name="InputFormField" component={InputFormField} />
      <Stack.Screen name="ClientLeadInfoTab" component={ClientLeadInfoTab} />
    </Stack.Navigator>
  );
};
