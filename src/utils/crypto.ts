import CryptoJS from 'react-native-crypto-js';

export class DecryptionError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
  }
}

export function decryptUtility(
  encryptedString: string,
  valueType: 'single value' | 'object',
  rkEncryptionKey: string,
  rkEncryptionIv: string,
): Record<string, any> | string {
  try {
    const key = CryptoJS.enc.Utf8.parse(rkEncryptionKey);
    const iv = CryptoJS.enc.Utf8.parse(rkEncryptionIv);

    const decrypted = CryptoJS.AES.decrypt(encryptedString, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: iv,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      throw new Error('Decryption resulted in an empty string');
    }

    return valueType === 'single value'
      ? decryptedText
      : JSON.parse(decryptedText);
  } catch (error) {
    console.error('Decryption failed: ', error);
    return '';
  }
}

export function encryptUtility(
  obj: Record<string, any> | null,
  rkEncryptionKey: string,
  rkEncryptionIv: string,
): string {
  const key = CryptoJS.enc.Utf8.parse(rkEncryptionKey);
  const iv = CryptoJS.enc.Utf8.parse(rkEncryptionIv);

  const plainText = JSON.stringify(obj);

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: iv,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function encryptSingleValueUtility(
  value: string,
  rkEncryptionKey: string,
  rkEncryptionIv: string,
): string {
  const key = CryptoJS.enc.Utf8.parse(rkEncryptionKey);
  const iv = CryptoJS.enc.Utf8.parse(rkEncryptionIv);

  const plainText = JSON.stringify(value);

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: iv,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
