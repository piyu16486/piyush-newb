import {parsePhoneNumber} from 'awesome-phonenumber';
import {Country} from 'react-native-country-picker-modal';
import CryptoJS from 'react-native-crypto-js';
import Toast from 'react-native-toast-message';

/**
 * If the value is encrypted, decrypt it. Otherwise, return the original value.
 *
 * @param value - The value to decrypt, or return if it is not encrypted.
 * @returns The decrypted value if it was encrypted, otherwise the original value.
 */
export function getEnvironmentVariable(value: string) {
  const secreteKey =
    'be5be17a84f4ed5d4fb780ea3784d1f93a833e851585f831599720ed4b0b8a0e';
  if (value.startsWith('encrypted:')) {
    const cipherText = value.replace('encrypted:', '');
    let bytes = CryptoJS.AES.decrypt(cipherText, secreteKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }
  return value;
}

/**
 * Validates whether a given email address is in a proper format.
 *
 * @param email - The email address to validate.
 * @returns True if the email address is valid, otherwise false.
 */

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates whether a given mobile number is in a proper format.
 *
 * @param mobile - The mobile number to validate.
 * @param countryCode - The country code of the mobile number.
 * @returns True if the mobile number is valid, otherwise false.
 */
export function isValidMobile(mobile: string, countryCode: string) {
  if (countryCode === '91') {
    return /[6-9]\d{9}/.test(mobile);
  } else {
    return parsePhoneNumber(`+${countryCode}${mobile}`).valid;
  }
}

/**
 * Verifies whether the given first and last names are valid.
 *
 * @param firstName - The first name to verify.
 * @param lastName - The last name to verify.
 * @returns True if the names are valid, otherwise false.
 */
export const handleNameVerifications = (
  firstName: string,
  lastName: string,
) => {
  if (!firstName.trim() || !lastName.trim()) {
    Toast.show({
      type: 'error',
      text1: 'Name is required',
      visibilityTime: 2000,
    });
    return false;
  }
  if (firstName.length < 2 || lastName.length < 2) {
    Toast.show({
      type: 'error',
      text1: 'Name is too short',
      visibilityTime: 2000,
    });
    return false;
  }
  return true;
};

/**
 * Verifies whether the given mobile number is valid.
 *
 * @param mobileNumber - The mobile number to verify.
 * @param country - The country of the mobile number.
 * @returns True if the mobile number is valid, otherwise false.
 */
export const handleMobileVerification = (
  mobileNumber: string,
  country: Country,
) => {
  if (!mobileNumber.trim()) {
    Toast.show({
      type: 'error',
      text1: 'Mobile no. is required',
      visibilityTime: 2000,
    });
    return false;
  }
  if (!isValidMobile(mobileNumber.trim(), country.callingCode[0])) {
    Toast.show({
      type: 'error',
      text1: 'Mobile no. is not valid',
      visibilityTime: 2000,
    });
    return false;
  }
  return true;
};

/**
 * Verifies whether the given email address is valid.
 *
 * @param email - The email address to verify.
 * @returns True if the email address is valid, otherwise false.
 */
export const handleEmailVerification = (email: string) => {
  if (!email.trim()) {
    Toast.show({
      type: 'error',
      text1: 'Email is required',
      visibilityTime: 2000,
    });
    return false;
  }
  if (!isValidEmail(email.trim())) {
    Toast.show({
      type: 'error',
      text1: 'Email is not valid',
      visibilityTime: 2000,
    });
    return false;
  }
  return true;
};
