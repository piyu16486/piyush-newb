/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {AppBar, Container} from '@components/index';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {LeftChevronCircle} from '@assets/Icons';
import Colors from '@constants/Colors';
import {scaleFont} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';

export const ClientDetailsScreen = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View style={styles.subcontainer}>
        <Text style={styles.subheader}>Client Information</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LimeGray,
    paddingLeft: 16, // Spacing from the left
    paddingVertical: 12,
  },
  subheader: {
    marginLeft: 12, // Space between icon and text
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: '#333',
  },
});
