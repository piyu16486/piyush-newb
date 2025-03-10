import {LogoImg} from '@assets/images';
import { FontWeight } from '@constants/index';
import {Scale} from '@utils/Scale';
import React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';

export const Header = ({
  title = 'Welcome to CashnTech',
  showWelcomeText = true,
  ShowPasswordalabel = false,
  ShowPasswordalabel2 = false,
  ShowPasswordalert = false,
  showEligibility = false,
}) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          source={LogoImg}
          style={styles.logo} // Apply responsive logo size
        />
      </View>

      {showWelcomeText && <Text style={styles.welcomeText}>{title}</Text>}

      {ShowPasswordalabel && (
        <Text style={styles.welcomeText}>Re-Set your a Password</Text>
      )}
      {ShowPasswordalabel2 && (
        <Text style={styles.welcomeText}>Create your Password</Text>
      )}

      {ShowPasswordalert && (
        <Text style={styles.subtitle}>
          <Text style={styles.subtitle}>
            Your password must be at least 8 characters long and include
          </Text>
          <Text style={styles.subtitle}> 1 symbol and 1 number. </Text>
        </Text>
      )}

      {showEligibility && (
        <Text style={styles.subtitle}>Unlock your Eligibility now</Text>
      )}
    </View>
  );
};

// Define your styles
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -3,
  },
  logo: {
    resizeMode: 'contain',
    marginBottom: 35,
    width: Scale(230),
    height: Scale(40),
  },
  welcomeText: {
    fontSize: Scale(16),
    marginTop: Scale(35.3),
    color: '#332D2D',
    textAlign: 'left',
    fontWeight: FontWeight.Medium,
    fontFamily: 'Gilroy',
    marginBottom: Scale(10),
  },
  subtitle: {
    fontSize: Scale(12),
    color: '#A6A6A6',
    textAlign: 'left',
    fontFamily: 'gilroy-medium',
    marginTop: 2,
  },
});
