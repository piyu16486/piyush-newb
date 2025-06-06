import {RightCheckmark} from '@assets/Icons';
import {
  AppBar,
  Container,
  DashedButton,
  Input,
  UploadModal,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {DocumentPickerResponse} from '@react-native-documents/picker';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {clientActions, IuploadCompanyPanPayload} from '@store/client';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const CompanyPanCard = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [uploadType, setUploadType] = useState<
    'frontPanImage' | 'backPanImage' | null
  >(null);
  const [namePan, setNamePan] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [dateofBirth, setDateofBirth] = useState('');
  const [frontPanImage, setFrontPanImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [backPanImage, setBackPanImage] = useState<
    DocumentPickerResponse | undefined
  >();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(namePan, panNumber, dateofBirth);
    const allFieldsFilled =
      namePan && panNumber && dateofBirth && frontPanImage && backPanImage;

    if (!allFieldsFilled) {
      console.warn(
        'Please fill all required Company pan and upload both images',
      );
      Alert.alert(
        'validation Error',
        'Please fill all fields and upload both front and back images',
      );
      return;
    }

    const payload: IuploadCompanyPanPayload = {
      clientId: 16, // ✅ fixed
      uploaded_by: 'Nishith Upadhyay', // ✅ fixed
      docDetails: {
        name_as_per_pan: namePan,
        pan_number: panNumber,
      },
      doc: [
        {
          name: frontPanImage.name ?? `${Date.now()}-front`,
          type: frontPanImage.type ?? 'image/jpeg',
          uri: frontPanImage.uri,
        },
        {
          name: backPanImage.name ?? `${Date.now()}-back`,
          type: backPanImage.type ?? 'image/jpeg',
          uri: backPanImage.uri,
        },
      ],
    };

    console.log('Disp uploadCompanyPanRequest', payload);
    dispatch(clientActions.uploadCompanyPanRequest(payload));
  };

  const handleClear = () => {
    setNamePan('');
    setPanNumber('');
    setDateofBirth('');
    setFrontPanImage(undefined);
    setBackPanImage(undefined);
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Kyc Document</Text>
      </View>
      <View style={styles.container}>
        {/* Main Applicant Section */}
        <Text style={styles.sectionTitle}>Company PAN Card</Text>
        <Input
          label="Name as per PAN"
          value={namePan}
          onChangeText={setNamePan}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="PAN Number"
          value={panNumber}
          onChangeText={setPanNumber}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="Date of Birth"
          value={dateofBirth}
          onChangeText={setDateofBirth}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />

        {frontPanImage ? (
          <Text>File Name: {frontPanImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Front side of PAN"
            onPress={() => {
              setUploadType('frontPanImage');
              setIsVisible(true);
            }}
          />
        )}

        {backPanImage ? (
          <Text>File Name: {backPanImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Back side of PAN"
            onPress={() => {
              setUploadType('backPanImage');
              setIsVisible(true);
            }}
          />
        )}

        <UploadModal
          visible={isVisible}
          onClose={file => {
            if (file) {
              switch (uploadType) {
                case 'frontPanImage':
                  setFrontPanImage(file);
                  break;
                case 'backPanImage':
                  setBackPanImage(file);
                  break;
              }
            }
            setIsVisible(false);
            setUploadType(null);
          }}
        />

        <View style={styles.footerButton}>
          {/* Clear All Button */}
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
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
              onPress={handleSubmit}>
              <Text style={styles.saveText}>Submit</Text>
              <RightCheckmark width={12} height={12} />
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
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(20),
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
