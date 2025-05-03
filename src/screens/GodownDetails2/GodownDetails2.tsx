import {
  AppBar,
  Container,
  CustomDropdown,
  DashedButton,
  Input,
} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const GodownDetails2 = () => {
  return (
    <Container>
      <AppBar title="KYC Document" />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload Godown Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Go Down Details</Text>
          <CustomDropdown
            label="Ownership Status"
            data={[
              {label: 'Rented', value: 'rented'},
              {label: 'Partnership', value: 'partnership'},
              {label: 'Owned', value: 'owned'},
              {label: 'Private Limited Company', value: 'private_ltd'},
              {label: 'Public Limited Company', value: 'public_ltd'},
              {label: 'Limited Liability Company', value: 'llc'},
              {label: 'Corporation', value: 'corporation'},
              {label: 'Cooperative', value: 'cooperative'},
              {label: 'Nonprofit Organization', value: 'nonprofit'},
              {label: 'Franchise', value: 'franchise'},
            ]}
            containerStyle={{marginBottom: scaleHeight(24)}}
          />

          <Input
            label="Name of Owner"
            containerStyle={{marginBottom: scaleHeight(14)}}
          />
          <DashedButton label="Upload Electricity Bill" />
        </View>

        {/* Fixed button row at the bottom */}
        <View style={styles.buttonRow}>
          <Text style={styles.clearText}>clear all</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit ✔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: scaleWidth(8),
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
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
  dropdown: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    zIndex: 1000,
    elevation: 5,
  },
  labelText: {
    fontSize: 16,
  },
  image_arrow: {
    width: 17,
    height: 20,
    margin: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(20),
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  clearText: {
    color: 'red',
    fontSize: 13,
    marginRight: 10,
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
