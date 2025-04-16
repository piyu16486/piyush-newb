import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ClientCardReadMore,
  ClientInfo,
  ClientLeadInfoTab,
  FormSelectionScreen,
  InputFormField,
  SoftsanctionProcess,
} from '@screens/index';
import {ClientNavigatorType} from '@type/NavigatorTypes';
import {Softsanction} from '@screens/SoftSanction/Softsanction';

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
      <Stack.Screen name="ClientCardReadMore" component={ClientCardReadMore} />
      <Stack.Screen name="Softsanction" component={Softsanction} />
      <Stack.Screen
        name="SoftsanctionProcess"
        component={SoftsanctionProcess}
      />
    </Stack.Navigator>
  );
};
