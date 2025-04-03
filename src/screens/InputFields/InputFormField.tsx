/* eslint-disable @typescript-eslint/no-unused-vars */
import {AppBar, Container} from '@components/index';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import React from 'react';
import {View, Text} from 'react-native';

export default function InputFormField() {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
    </Container>
  );
}
