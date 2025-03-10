import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Header} from '@components/index';

type RootStackParamList = {
  OTPVerificationScreen: {email: string; fromLogin: boolean}; // ✅ Allow email parameter
  MobileLoginScreen: undefined;
  EmailSignup: undefined;
};

type NavigationPropV = StackNavigationProp<
  RootStackParamList,
  'OTPVerificationScreen'
>;

const isTablet = () => false; // Font sizes for different text types
const FONT_SIZES = {
  header: isTablet() ? 22 : 18, // Larger font size for tablets
  subheader: isTablet() ? 20 : 16,
  normal: isTablet() ? 18 : 14,
  subnormal: isTablet() ? 20 : 12,
  body: isTablet() ? 14 : 12,
  subbody: isTablet() ? 16 : 14,
};

export const EmailSignupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationPropV>();

  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Function to validate email
  const isValidEmail = (_email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(_email);
  };

  // ✅ Save email to AsyncStorage and navigate
  const handleVerification = () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
        visibilityTime: 1000,
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Email is not valid',
        visibilityTime: 1000,
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Valid email',
      visibilityTime: 1000, // Toast disappears after 1 second
    });

    navigation.navigate('OTPVerificationScreen', {email, fromLogin: false}); // ✅ Pass email
  };

  const handleMobileLogin = () => {
    navigation.navigate('MobileLoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title={'Welcome to CashnTech'} showEligibility />
      {/* Welcome Text */}
      {/* Email Input */}
      <Text style={[styles.label, {fontSize: FONT_SIZES.normal}]}>
        Enter your Email Address
      </Text>
      <TextInput
        style={styles.inputLabel}
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email} // ✅ Bind value to state
        onChangeText={setEmail} // ✅ Update state when user types
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleVerification}>
        <Text style={[styles.primaryButtonText, {fontSize: FONT_SIZES.normal}]}>
          Get Verification Code
        </Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={[styles.dividerText, {fontSize: FONT_SIZES.subbody}]}>
          or
        </Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleMobileLogin}>
        <Text
          style={[styles.secondaryButtonText, {fontSize: FONT_SIZES.normal}]}>
          Continue with Mobile No.
        </Text>
      </TouchableOpacity>
      {/* Footer */}
      <Text style={[styles.footerText, {fontSize: FONT_SIZES.subheader}]}>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('EmailSignup')}>
          <Text style={styles.footerTextLink}>Sign In</Text>
        </Text>
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end', // Aligns everything to the bottom of the screen
          alignItems: 'center', // Centers content horizontally
          marginBottom: 20, // Adds space between content and bottom of the screen
        }}>
        {/* First Text block with a line break */}
        <Text style={[styles.agreementText, {fontSize: FONT_SIZES.subbody}]}>
          By signing in, you agree to our
        </Text>

        {/* Use margin to create space between the text */}
        <Text
          style={[
            styles.agreementText,
            {marginTop: 2},
            {fontSize: FONT_SIZES.subbody},
          ]}>
          {' '}
          {/* Adds a small margin */}
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Text style={styles.agreementText}> and </Text>
          <Text style={styles.linkText}>Terms of Service</Text>
        </Text>

        {/* Copyright text */}
        <Text style={[styles.copyrightText, {fontSize: FONT_SIZES.body}]}>
          Copyright 2024, CashnTech Pvt Ltd, All Rights Reserved
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  label: {
    fontSize: 16,
    marginTop: 36,
    marginBottom: 10,
    fontFamily: 'gilroy-medium',
  },
  labelpassword: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 10,
    fontFamily: 'gilroy-medium',
  },
  inputLabel: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    // marginBottom: 8,
  },
  inputContainer: {
    marginVertical: 10,
    marginBottom: 8,
  },
  labelPassword: {
    marginTop: 24,
    fontSize: 14,
    marginBottom: 5,
    color: '#332D2D',
    fontFamily: 'gilroy-medium',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#9D9393',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#7A7A7A',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //marginBottom: 2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: 1.5,
    // height: 1.5,
  },
  checkbox: {
    width: 10,
    height: 10,
    marginRight: 2,
    borderWidth: 1, // Creates the border
    borderRadius: 2, // Square shape with rounded top-left corner
    borderColor: '#9D9393',
    opacity: 1, // Fully visible
  },
  checkboxChecked: {
    backgroundColor: '#9D9393', // Changes background when checked
  },
  checkboxText: {
    fontSize: 12,
    color: '#7F7F7FC4',
    marginLeft: 6,
    fontFamily: 'gilroy-medium',
  },
  forgotText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'gilroy-medium',
  },
  primaryButton: {
    backgroundColor: '#E30613',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 19,
    //marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
    //fontFamily: 'gilroy-medium',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24.5,
    //marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#888',
    fontFamily: 'gilroy-medium',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E63946',
    padding: 15,
    marginTop: 24.5,
    borderRadius: 5,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#E30613',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'gilroy-medium',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#202325',
    marginTop: 33,
    //marginBottom: 33,
    fontFamily: 'gilroy-medium',
  },
  footerTextLink: {
    color: '#E63946',
    textDecorationLine: 'underline',
    fontFamily: 'gilroy-medium',
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontFamily: 'gilroy-medium',
    marginTop: 24,
  },
  agreementText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#A6A6A6',
    // marginTop: 56,
    fontFamily: 'gilroy-medium',
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#C0BBBB',
    marginTop: 24,
    fontFamily: 'gilroy-medium',
  },
});
