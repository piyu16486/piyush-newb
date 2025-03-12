import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Container, Header, Input} from '@components/index';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {Colors, Fonts} from '@constants/index';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
export const SignupScreen = () => {
  const [signupMode, setSignupMode] = useState<'email' | 'mobile'>('email');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [country, setCountry] = useState<Country>({
    cca2: 'IN',
    currency: ['INR'],
    callingCode: ['91'],
    region: 'Asia',
    subregion: 'Southern Asia',
    flag: 'flag-in',
    name: 'India',
  });

  return (
    <Container>
      <View style={styles.flex1}>
        <Header
          title="Welcome to CashnTech"
          subtitle="Unlock your Eligibility now"
        />
        <View style={styles.inputContainer}>
          <Input
            label={
              signupMode === 'email'
                ? 'Enter your Email Address'
                : 'Enter your Mobile Number'
            }
            renderLeftIcon={
              signupMode === 'email' ? undefined : (
                <View style={styles.countryCodeContainer}>
                  <CountryPicker
                    visible={showCountryModal}
                    countryCode={country.cca2}
                    onSelect={item => {
                      setShowCountryModal(false);
                      setCountry(item);
                    }}
                    withEmoji
                    withFlag
                    withCallingCode
                    withAlphaFilter
                    withFilter
                    withFlagButton
                    withCallingCodeButton
                  />
                </View>
              )
            }
            leftIconStyle={styles.leftIcon}
            onPressLeftIcon={() => {
              setShowCountryModal(prv => !prv);
            }}
            keyboardType={
              signupMode === 'email' ? 'email-address' : 'number-pad'
            }
          />
          <Button
            buttonText={
              signupMode === 'email' ? 'Get Verification Code' : 'Get OTP'
            }
            style={{marginTop: scaleHeight(35)}}
          />
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <Button
            buttonText={
              signupMode === 'email'
                ? 'Continue with Mobile No.'
                : 'Continue with Email ID'
            }
            mode="outlined"
            style={{marginTop: scaleHeight(24)}}
            onPress={() => {
              if (signupMode === 'email') {
                setSignupMode('mobile');
              } else {
                setSignupMode('email');
              }
            }}
          />

          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity>
              <Text style={[styles.accountText, styles.accountLinkText]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.copyRightContainer}>
          <Text style={styles.termConText}>
            By signing in, you agree to our
          </Text>
          <Text style={styles.termConText}>
            <Text style={styles.termConLinkText}>Privacy Policy</Text>
            {' and '}
            <Text style={styles.termConLinkText}>Terms of Service</Text>
          </Text>
        </View>
        <Text style={styles.copyRightText}>
          Copyright 2024, CashnTech Pvt Ltd., All Rights Reserved
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  inputContainer: {
    marginHorizontal: scaleWidth(43),
    marginTop: scaleHeight(64),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleHeight(35),
  },
  divider: {
    flex: 1,
    height: scaleHeight(2),
    backgroundColor: '#CED0CE',
    borderRadius: 10,
  },
  dividerText: {
    marginHorizontal: scaleWidth(10),
    color: Colors.lightGray,
    lineHeight: scaleFont(14),
    fontSize: scaleFont(14),
    fontFamily: Fonts.GilroyMedium,
  },
  accountContainer: {
    marginTop: scaleHeight(93),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    color: '#202325',
    fontFamily: Fonts.GilroySemiBold,
    fontSize: scaleFont(16),
  },
  accountLinkText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
  },
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
  countryCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: scaleWidth(4),
  },
  leftIcon: {
    borderRightWidth: scaleWidth(1.5),
    borderColor: Colors.gray300,
    height: '100%',
    flexDirection: 'row',
  },
});
