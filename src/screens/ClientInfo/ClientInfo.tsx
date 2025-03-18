import React from 'react';
import {AppBar, Container} from '@components/index';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeNavigatorType} from '@type/NavigatorTypes';

export const ClientInfo = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();
  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
    </Container>
  );
};
