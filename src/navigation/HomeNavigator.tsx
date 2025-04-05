import {DrawerContent} from '@components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {scaleWidth} from '@utils/Scale';
import React from 'react';
import {Dimensions} from 'react-native';
import {ClientDetailsScreen, ClientInfo, InputFormField} from '@screens/index';
import {ClientNavigator} from './ClientNavigator';

const Drawer = createDrawerNavigator<HomeNavigatorType>();

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: scaleWidth(8),
          borderBottomRightRadius: scaleWidth(8),
          width: Dimensions.get('window').width * 0.7,
        },
      }}
      drawerContent={DrawerContent}>
      <Drawer.Screen name="ClientNavigator" component={ClientNavigator} />
      {/* <Drawer.Screen name="ClientInfo" component={InputFormField} /> */}
      {/* <Drawer.Screen name="ClientInfo" component={ClientDetailsScreen} /> */}
    </Drawer.Navigator>
  );
};
