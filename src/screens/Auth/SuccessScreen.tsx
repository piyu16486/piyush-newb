import React from 'react';
import {Container, Header} from '@components/index';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '@constants/index';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import LottieView from 'lottie-react-native';
import {successLottie} from '@assets/Lottie';

export const SuccessScreen = () => {
  return (
    <Container>
      <View style={styles.flex1}>
        <Header title={`Welcome aboard,${''} \nYour account is now created.`} />
        <LottieView
          source={successLottie}
          autoPlay
          loop={false}
          style={styles.checkMark}
        />
      </View>
      <Text style={styles.copyRightText}>
        Copyright 2024, CashnTech Pvt Ltd., All Rights Reserved
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  copyRightText: {
    textAlign: 'center',
    color: Colors.gray200,
    fontFamily: Fonts.GilroyMedium,
    margin: scaleHeight(4),
    fontSize: scaleFont(10),
  },
  checkMark: {
    height: scaleWidth(100),
    width: scaleWidth(100),
    alignSelf: 'center',
    marginTop: scaleHeight(55),
  },
});
