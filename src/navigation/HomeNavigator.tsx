import {DrawerContent} from '@components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ClientInfo} from '@screens/index';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import React from 'react';

const Drawer = createDrawerNavigator<HomeNavigatorType>();

export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={DrawerContent}>
      <Drawer.Screen name="ClientInfo" component={ClientInfo} />
    </Drawer.Navigator>
  );
};
