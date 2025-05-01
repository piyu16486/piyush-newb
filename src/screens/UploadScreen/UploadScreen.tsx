import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '@constants/Colors';
import {File, RightCheckmark} from '@assets/Icons';
import Fonts from '@constants/Fonts';
import {scaleWidth, scaleHeight, scaleFont} from '@utils/Scale';

export const UploadScreen = () => {
  const handleBrowseFile = () => {
    // You can trigger DocumentPicker here
  };

  const handleSubmit = () => {
    // Upload logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload your File</Text>
      <Text style={styles.subtitle}>Supports JPG, PNG and PDF</Text>

      <View style={styles.uploadBox}>
        <File width={20} height={26} />
        <Text style={styles.info}>Max file size 15MB</Text>
        <Text style={styles.info}>Drag & Drop your file or</Text>

        <TouchableOpacity
          style={styles.browseButton}
          onPress={handleBrowseFile}>
          <Text style={styles.browseText}>Browse File</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.7}
        onPress={handleSubmit}>
        <Text style={styles.saveText}>Submit</Text>
        <RightCheckmark width={12} height={12} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.graybase,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.graybase,
    marginBottom: 16,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#B0B0B0',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  info: {
    fontSize: 14,
    color: Colors.graybase,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  browseText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(4),
    gap: scaleWidth(8),
    borderWidth: 1,
    borderColor: Colors.green,
    minWidth: scaleWidth(100),
  },
  saveText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(14),
  },
});
