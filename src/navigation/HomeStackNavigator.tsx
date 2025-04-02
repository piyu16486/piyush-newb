import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClientInfo from '@screens/ClientInfo';
import {FormSelectionScreen} from '@screens/index';

const Stack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientInfo" component={ClientInfo} />
      <Stack.Screen
        name="FormSelectionScreen"
        component={FormSelectionScreen}
      />
    </Stack.Navigator>
  );
};
