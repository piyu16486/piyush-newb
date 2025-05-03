import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SoftNavigatorType} from '@type/NavigatorTypes';
import {Softsanction} from '@screens/index';

const Stack = createNativeStackNavigator<SoftNavigatorType>();

export const SoftNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Softsanction" component={Softsanction} />
    </Stack.Navigator>
  );
};

// export const SoftNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <SoftStack.Screen name="Softsanction" component={Softsanction} />
//     </Stack.Navigator>
//   );
// };
