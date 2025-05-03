import {AppBar, Container, DashedButton, Input} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight} from '@utils/Scale';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const CompanyPanCard = () => {
  return (
    <Container>
      <AppBar title="Client Information Master" />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Kyc Document</Text>
      </View>
      <View style={styles.container}>
        {/* Main Applicant Section */}
        <Text style={styles.sectionTitle}>Company PAN Card</Text>
        <Input
          label="Name as per PAN"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="PAN Number"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="Date of Birth"
          containerStyle={{marginBottom: scaleHeight(24)}}
        />

        <DashedButton label="Upload front side of PAN" />
        <DashedButton label="Upload Back side of PAN" />

        {/* Buttons */}
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

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(20),
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10, // Space between Save and Submit buttons
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
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
