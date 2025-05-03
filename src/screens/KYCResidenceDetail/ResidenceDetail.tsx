/* eslint-disable react-native/no-inline-styles */
import {RightCheckmark, Upload} from '@assets/Icons';
import {AppBar, Container} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type LabelProps = {
  label: string;
};

export const ResidenceDetail = () => {
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
          <Text style={styles.label}>Company Type</Text>

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

          <InputField label="Name of Owner" />
          <InputField label="Value" />

          <UploadBox label="Upload Agreement Copy" />
        </View>

        {/* Fixed button row at the bottom */}
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
      </View>
    </Container>
  );
};

const InputField = ({label}: LabelProps) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} placeholder="Value" editable={false} />
  </View>
);

const UploadBox = ({label}: LabelProps) => (
  <View style={styles.uploadBox}>
    <Upload width={18} height={13} />
    <Text style={styles.uploadText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  contentContainer: {
    flex: 1,
    // padding: 16,
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
