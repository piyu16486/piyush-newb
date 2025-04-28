import {Upload} from '@assets/Icons';
import {AppBar, Container, Input} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight} from '@utils/Scale';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

type LabelProps = {
  label: string;
};

export const GSTDocument = () => {
  const navigation = useNavigation<KycNavigationType>();

  return (
    <Container>
      <AppBar title="KYC Document" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload GST Document Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.scrollContainer}>
          {/* Main Content */}
          <Text style={styles.sectionTitle}>GST Document</Text>
          <Input
            label="Name as per GST Certificate"
            containerStyle={{marginBottom: scaleHeight(24)}}
          />
          <Input
            label="GST Number"
            containerStyle={{marginBottom: scaleHeight(24)}}
          />

          <UploadBox label="Upload GST Certificate" />
        </View>

        {/* Fixed Buttons at Bottom */}
        <View style={styles.buttonContainer}>
          <Text style={styles.clearText}>clear all</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Submit ✔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
};

const UploadBox = ({label}: LabelProps) => (
  <View style={styles.uploadBox}>
    <Upload width={18} height={13} />
    <Text style={styles.uploadText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Subcontainer: {
    backgroundColor: '#fff',
  },
  Subheader: {
    width: '100%', // ✅ Ensures full width
    padding: 16,
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    backgroundColor: Colors.LimeGray,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Extra padding to account for button height
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    gap: 10,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#888',
  },
  uploadText: {
    fontSize: 13,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  clearText: {
    color: 'red',
    fontSize: 13,
  },

  buttonGroup: {
    flexDirection: 'row',
    gap: 10, // Space between Save and Submit buttons
  },

  saveButton: {
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  saveText: {
    color: '#28a745',
    fontSize: 13,
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 13,
  },
});
