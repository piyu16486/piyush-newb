import {RightCheckmark} from '@assets/Icons';
import {
  AppBar,
  Container,
  CustomDropdown,
  DashedButton,
  Input,
  UploadModal,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {DocumentPickerResponse} from '@react-native-documents/picker';
import {IUploadResidenceDetailsPayload} from '@store/client';
import {uploadResidenceRequest} from '@store/client/client.slice';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';

export const ResidenceDetail = () => {
  const [ownershipStatus, setOwnershipStatus] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [uploadType, setUploadType] = useState<
    'agreementCopy' | 'electricityBill' | null
  >(null);
  const [nameofOwner, setnameofOwner] = useState('');
  const [agreementCopy, setAgreementCopy] = useState<
    DocumentPickerResponse | undefined
  >();
  const [electricityBill, setElectricityBill] = useState<
    DocumentPickerResponse | undefined
  >();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(nameofOwner, agreementCopy, electricityBill);
    if (!nameofOwner || !ownershipStatus) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }

    const selectedFile =
      ownershipStatus === 'rented' ? agreementCopy : electricityBill;

    if (!selectedFile) {
      Alert.alert('Validation Error', 'Please upload the required document.');
      return;
    }

    const payload: IUploadResidenceDetailsPayload = {
      doc: {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      },
      clientId: 22,
      uploaded_by: 'Nishith Upadhyay',
      params: 'residenceProof',
      client_name: nameofOwner,
      name_of_owner: nameofOwner,
      ownership_status: ownershipStatus,
    };

    console.log('Disp uploadResidenceRequest', payload);
    dispatch(uploadResidenceRequest(payload));
  };

  const handleClear = () => {
    setnameofOwner('');
    setAgreementCopy(undefined);
    setElectricityBill(undefined);
  };

  return (
    <Container>
      <AppBar title="KYC Document" />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload Residence Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Residence Details</Text>

          <CustomDropdown
            label="Ownership Status"
            data={[
              {label: 'Rented', value: 'rented'},
              {label: 'Owned', value: 'owned'},
            ]}
            value={ownershipStatus ?? undefined}
            onChange={val => setOwnershipStatus(val)}
            containerStyle={{marginBottom: scaleHeight(20)}}
          />

          {ownershipStatus && (
            <>
              <Input
                label="Name of Owner"
                value={nameofOwner}
                onChangeText={setnameofOwner}
                containerStyle={{marginBottom: scaleHeight(20)}}
              />

              {ownershipStatus === 'rented' ? (
                <>
                  {agreementCopy ? (
                    <Text>File Name: {agreementCopy.name}</Text>
                  ) : null}
                  <DashedButton
                    label="Upload Agreement Copy"
                    onPress={() => {
                      setUploadType('agreementCopy');
                      setIsVisible(true);
                    }}
                  />
                </>
              ) : (
                <>
                  {electricityBill ? (
                    <Text>File Name: {electricityBill.name}</Text>
                  ) : null}
                  <DashedButton
                    label="Upload Electricity Bill"
                    onPress={() => {
                      setUploadType('electricityBill');
                      setIsVisible(true);
                    }}
                  />
                </>
              )}

              <UploadModal
                visible={isVisible}
                onClose={file => {
                  if (file) {
                    switch (uploadType) {
                      case 'agreementCopy':
                        setAgreementCopy(file);
                        break;
                      case 'electricityBill':
                        setElectricityBill(file);
                        break;
                    }
                  }
                  setIsVisible(false);
                  setUploadType(null);
                }}
              />

              {/* Fixed button row at the bottom */}
              <View style={styles.footerButton}>
                {/* Clear All Button */}
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={handleClear}>
                  <Text style={styles.clearText}>Clear all</Text>
                </TouchableOpacity>
                {/* Save Button */}
                <View style={styles.row}>
                  <TouchableOpacity
                    style={[styles.saveButton, {backgroundColor: Colors.white}]}
                    activeOpacity={0.7}
                    onPress={() => console.log('Save Pressed')}>
                    <Text style={[styles.saveText, {color: Colors.green}]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveButton}
                    activeOpacity={0.7}
                    onPress={handleSubmit}>
                    <Text style={styles.saveText}>Submit</Text>
                    <RightCheckmark width={12} height={12} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Container>
  );
};

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
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(16),
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
    marginTop: scaleHeight(30),
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
