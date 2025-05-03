/* eslint-disable react-native/no-inline-styles */
import {RightCheckmark, Upload} from '@assets/Icons';
import {AppBar, Container, Input} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {scaleWidth, scaleHeight, scaleFont} from '@utils/Scale';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export const KycUploadAdhar = () => {
  return (
    <Container>
      <AppBar title="KYC Document" />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload Aadhar Card Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Main Applicant Section */}
        <Text style={styles.sectionTitle}>
          Main Applicant Aadhar Card Details
        </Text>
        <Input
          label="Name as per Aadhar Card"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="Aadhar number"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />

        <TouchableOpacity style={styles.uploadButton}>
          <Upload width={18} height={18} style={{marginRight: 10}} />
          <Text style={styles.uploadText}>Upload Front side of Aadhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.uploadButton, {marginTop: 20}]}>
          <Upload width={18} height={18} style={{marginRight: 10}} />
          <Text style={styles.uploadText}>Upload Back side of Aadhar</Text>
        </TouchableOpacity>

        {/* Co Applicant Section */}
        <Text style={styles.sectionTitle}>Co Applicant Aadhar Card Details</Text>
        <Input
          label="Name as per Aadhar Card"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="Aadhar number"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />

        <TouchableOpacity style={[styles.uploadButton, {marginBottom: 20}]}>
          <Upload width={18} height={18} style={{marginRight: 10}} />
          <Text style={styles.uploadText}>Upload Front side of Aadhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton}>
          <Upload width={18} height={18} style={{marginRight: 10}} />
          <Text style={styles.uploadText}>Upload Back side of Aadhar</Text>
        </TouchableOpacity>

        <View style={styles.footerButton}>
          {/* Clear All Button */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => console.log('Clear All Pressed')}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
          {/* Save Button */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.saveButton, {backgroundColor: Colors.white}]}
              activeOpacity={0.7}
              onPress={() => console.log('Save Pressed')}>
              <Text style={[styles.saveText, {color: Colors.green}]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.7}
              onPress={() => console.log('Next Pressed')}>
              <Text style={styles.saveText}>Submit</Text>
              <RightCheckmark width={12} height={12} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // <--- this aligns it to the left
    borderWidth: 2,
    borderColor: '#B0B0B0',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Colors.LimeGray,
  },
  uploadText: {
    fontSize: scaleFont(14),
    color: Colors.graybase,
    fontWeight: fontWeight.Medium,
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
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#888',
  },
  buttonRow: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  clearButton: {},
  clearText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
});
