/* eslint-disable @typescript-eslint/no-unused-vars */
import {DrawerContent} from '@components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ClientInfo, FormSelectionScreen} from '@screens/index';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {scaleWidth} from '@utils/Scale';
import React from 'react';
import {Dimensions} from 'react-native';
import {HomeStackNavigator} from './HomeStackNavigator';

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
      <Drawer.Screen name="ClientInfo" component={ClientInfo} />
      {/* <Drawer.Screen name="HomeStack" component={HomeStackNavigator} /> */}
    </Drawer.Navigator>
  );
};
