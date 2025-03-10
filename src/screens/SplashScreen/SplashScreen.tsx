import React from 'react';
import { LogoImg } from '@assets/images';
import { Colors } from '@constants/index';
import { Image, StyleSheet, View } from 'react-native';
import { Scale } from '@utils/Scale';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={LogoImg} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white, // White background for the splash screen
  },
  logo: {
    width: Scale(215),
    height: Scale(53.5),
    resizeMode: 'contain',
  },
});

