import {RightCheckmark} from '@assets/Icons';
import {
  Container,
  AppBar,
  Input,
  DashedButton,
  UploadModal,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {DocumentPickerResponse} from '@react-native-documents/picker';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {clientActions} from '@store/client';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const KycUplaodPan = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);

  const [uploadType, setUploadType] = useState<
    'mainFront' | 'mainBack' | 'coFront' | 'coBack' | null
  >(null);

  const [namePan, setNamePan] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [dateofBirth, setDateofBirth] = useState('');
  const [frontImage, setFrontImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [backImage, setBackImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [coApplicantNamePan, setCoApplicantNamePan] = useState('');
  const [coApplicantPanNumber, setCoApplicantPanNumber] = useState('');
  const [coApplicantDateofBirth, setCoApplicantDateofBirth] = useState('');
  const [coApplicantFrontImage, setCoApplicantFrontImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [coApplicantBackImage, setCoApplicantBackImage] = useState<
    DocumentPickerResponse | undefined
  >();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(
      namePan,
      panNumber,
      dateofBirth,
      frontImage,
      backImage,
      coApplicantNamePan,
      coApplicantPanNumber,
      coApplicantDateofBirth,
      coApplicantFrontImage,
      coApplicantBackImage,
    );

    const allFieldsFilled =
      namePan &&
      panNumber &&
      dateofBirth &&
      frontImage &&
      backImage &&
      coApplicantNamePan &&
      coApplicantPanNumber &&
      coApplicantDateofBirth &&
      coApplicantFrontImage &&
      coApplicantBackImage;

    if (allFieldsFilled) {
      const payload = {
        clientId: 22,
        uploaded_by: 'Nishith Upadhyay',
        doc: [
          {
            name_as_per_pan: namePan,
            pan_number: panNumber,
            dob: dateofBirth,
          },
          {
            name_as_per_pan: coApplicantNamePan,
            pan_number: coApplicantPanNumber,
            dob: coApplicantDateofBirth,
          },
        ],
        files: [
          {
            uri: frontImage.uri,
            name: frontImage.name ?? Date.now().toString(),
            type: frontImage.type ?? 'image/png',
          },
          {
            uri: backImage.uri,
            name: backImage.name ?? Date.now().toString(),
            type: backImage.type ?? 'image/png',
          },
          {
            uri: coApplicantFrontImage.uri,
            name: coApplicantFrontImage.name ?? Date.now().toString(),
            type: coApplicantFrontImage.type ?? 'image/png',
          },
          {
            uri: coApplicantBackImage.uri,
            name: coApplicantBackImage.name ?? Date.now().toString(),
            type: coApplicantBackImage.type ?? 'image/png',
          },
        ],
      };

      console.log('Dispatching uploadPanRequest', payload);
      dispatch(clientActions.uploadPanRequest(payload));
    } else {
      console.warn('Please fill all required PAN details and upload images.');
    }
  };

  const handleClear = () => {
    setNamePan('');
    setPanNumber('');
    setDateofBirth('');
    setFrontImage(undefined);
    setBackImage(undefined);
    setCoApplicantNamePan('');
    setCoApplicantPanNumber('');
    setCoApplicantDateofBirth('');
    setCoApplicantFrontImage(undefined);
    setCoApplicantBackImage(undefined);
  };

  return (
    <Container>
      <AppBar title="KYC Document" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload PAN Card Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Main Applicant Section */}
        <Text style={styles.sectionTitle}>Main Applicant PAN Card Details</Text>
        <Input
          label="Name as per PAN"
          value={namePan}
          onChangeText={setNamePan}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="PAN number"
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

        {frontImage ? (
          <Text>File Name: {frontImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Front side of PAN"
            onPress={() => {
              setUploadType('mainFront');
              setIsVisible(true);
            }}
          />
        )}

        {backImage ? (
          <Text>File Name: {backImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Back side of PAN"
            onPress={() => {
              setUploadType('mainBack');
              setIsVisible(true);
            }}
          />
        )}

        {/* Co Applicant Section */}
        <Text style={styles.sectionTitle}>Co Applicant PAN Card Details</Text>
        <Input
          label="Name as per PAN"
          value={coApplicantNamePan}
          onChangeText={setCoApplicantNamePan}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="PAN number"
          value={coApplicantPanNumber}
          onChangeText={setCoApplicantPanNumber}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />
        <Input
          label="Date of Birth"
          value={coApplicantDateofBirth}
          onChangeText={setCoApplicantDateofBirth}
          containerStyle={{marginBottom: scaleHeight(24)}}
        />

        {coApplicantFrontImage ? (
          <Text>File Name: {coApplicantFrontImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Front side of PAN"
            onPress={() => {
              setUploadType('coFront');
              setIsVisible(true);
            }}
          />
        )}

        {coApplicantBackImage ? (
          <Text>File Name: {coApplicantBackImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Back side of PAN"
            onPress={() => {
              setUploadType('coBack');
              setIsVisible(true);
            }}
          />
        )}

        <UploadModal
          visible={isVisible}
          onClose={file => {
            if (file) {
              switch (uploadType) {
                case 'mainFront':
                  setFrontImage(file);
                  break;
                case 'mainBack':
                  setBackImage(file);
                  break;
                case 'coFront':
                  setCoApplicantFrontImage(file);
                  break;
                case 'coBack':
                  setCoApplicantBackImage(file);
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
