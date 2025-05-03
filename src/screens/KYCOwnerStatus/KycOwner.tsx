/* eslint-disable react-native/no-inline-styles */
import {AppBar, Container} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont} from '@utils/Scale';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export const KycOwner = () => {
  const [statustype, setstatustype] = useState(false);
  const [selectstatustype, setselectstatusType] = useState(null);
  const [statusType, setstatusType] = useState([
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
  ]);

  return (
    <Container>
      <AppBar title="KYC Document" />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload Residence Details</Text>
      </View>
      <View style={styles.mainContainer}>
        {/* Main content container with flex: 1 to push buttons to bottom */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Ownership Status</Text>

          <DropDownPicker
            open={statustype}
            value={selectstatustype}
            items={statusType}
            setOpen={setstatustype}
            setValue={setselectstatusType}
            setItems={setstatusType}
            placeholder="Partnership"
            style={styles.dropdown}
            dropDownContainerStyle={{
              ...styles.dropdownContainer,
              maxHeight: 250,
            }}
            labelStyle={styles.labelText}
          />
        </View>
      </View>
    </Container>
  );
};

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
  contentContainer: {
    flex: 1,
    padding: 16,
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
    fontSize: 14,
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
