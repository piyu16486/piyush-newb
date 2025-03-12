import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {scaleFont, scaleHeight} from '@utils/Scale';
import {Colors, Fonts} from '@constants/index';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';

export const TnCFooter = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthNavigatorType>;
}) => {
  return (
    <View>
      <View style={styles.copyRightContainer}>
        <Text style={styles.termConText}>By signing in, you agree to our</Text>
        <Text
          style={styles.termConText}
          onPress={() => {
            navigation.navigate('TermsOfService');
          }}>
          <Text style={styles.termConLinkText}>Privacy Policy</Text>
          {' and '}
          <Text
            style={styles.termConLinkText}
            onPress={() => {
              navigation.navigate('TermsOfService');
            }}>
            Terms of Service
          </Text>
        </Text>
      </View>
      <Text style={styles.copyRightText}>
        Copyright 2024, CashnTech Pvt Ltd., All Rights Reserved
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  copyRightContainer: {alignItems: 'center', marginBottom: scaleHeight(24)},
  termConText: {
    color: Colors.lightGray,
    fontFamily: Fonts.GilroyRegular,
    fontSize: scaleFont(14),
  },
  termConLinkText: {
    fontSize: scaleFont(14),
    color: Colors.tertiaryColor,
    fontFamily: Fonts.GilroySemiBold,
    textDecorationLine: 'underline',
  },
  copyRightText: {
    textAlign: 'center',
    color: Colors.gray200,
    fontFamily: Fonts.GilroyMedium,
    margin: scaleHeight(4),
    fontSize: scaleFont(10),
  },
});
