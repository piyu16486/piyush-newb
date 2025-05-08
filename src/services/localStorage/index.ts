import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const clearAllStorage = () => {
  storage.clearAll();
};

export const setStorage = <T>(key: string, value: T) => {
  if (typeof value === 'string') {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
};

export const getStorage = (key: string, toJson?: boolean) => {
  if (toJson) {
    return JSON.parse(storage.getString(key) ?? '{}');
  }
  return storage.getString(key);
};

export const removeStorage = (key: string) => {
  storage.delete(key);
};
