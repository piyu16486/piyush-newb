import CryptoJS from 'react-native-crypto-js';

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