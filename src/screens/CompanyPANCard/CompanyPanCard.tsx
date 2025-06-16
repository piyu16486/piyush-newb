import {RightCheckmark} from '@assets/Icons';
import {
  AppBar,
  Container,
  DashedButton,
  DateNTimePicker,
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
import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const CompanyPanCard = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const [errors, setErrors] = useState({
    namePan: false,
    panNumber: false,
    dateofBirth: false,
    frontPanImage: false,
    backPanImage: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(namePan, panNumber, dateofBirth);
    if (
      !namePan ||
      !panNumber ||
      !dateofBirth ||
      !frontPanImage ||
      !backPanImage
    ) {
      setErrors({
        namePan: !namePan,
        panNumber: !panNumber,
        dateofBirth: !dateofBirth,
        frontPanImage: !frontPanImage,
        backPanImage: !backPanImage,
      });

      let missingFields = [];
      if (!namePan) missingFields.push('Name as Pan');
      if (!panNumber) missingFields.push('Pan Number');
      if (!dateofBirth) missingFields.push('Date of Birth');
      if (!frontPanImage) missingFields.push('Upload Pan Image');
      if (!backPanImage) missingFields.push('Upload Pan Image');

      Alert.alert(
        'Missing Fields',
        `Please provide the following:\n${missingFields.join('\n')}`,
      );
      return;
    }

    setErrors({
      namePan: false,
      panNumber: false,
      dateofBirth: false,
      frontPanImage: false,
      backPanImage: false,
    });

    const payload: IuploadCompanyPanPayload = {
      clientId: 22,
      uploaded_by: 'Nishith Upadhyay',
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
    setLoading(true);
    dispatch(clientActions.uploadCompanyPanRequest(payload));
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Document Uploaded',
        text2: `${namePan}'s document submitted successfully`,
        position: 'top',
      });
      handleClear();
    }, 1500);
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
          onChangeText={text => {
            setNamePan(text);
            if (errors.namePan && text.trim()) {
              setErrors(prev => ({...prev, namePan: false}));
            }
          }}
          containerStyle={[
            {marginBottom: scaleHeight(24)},
            errors.namePan && {
              borderColor: Colors.red,
              borderWidth: 1,
              borderRadius: 5,
            },
          ]}
        />
        <Input
          label="PAN Number"
          value={panNumber}
          onChangeText={text => {
            setPanNumber(text);
            if (errors.panNumber && text.trim()) {
              setErrors(prev => ({...prev, panNumber: false}));
            }
          }}
          containerStyle={[
            {marginBottom: scaleHeight(24)},
            errors.panNumber && {
              borderColor: Colors.red,
              borderWidth: 1,
              borderRadius: 5,
            },
          ]}
        />
        <DateNTimePicker
          label="Date of Birth"
          value={dateofBirth}
          onConfirm={date => {
            const formatted = moment(date).format('DD-MM-YYYY'); // or 'YYYY-MM-DD'
            setDateofBirth(formatted);
            if (errors.dateofBirth) {
              setErrors(prev => ({...prev, dateofBirth: false}));
            }
          }}
          datePickerProps={{
            mode: 'date',
            maximumDate: new Date(), // optional: restrict future dates
          }}
          // containerStyle={[
          //   {marginBottom: scaleHeight(24)},
          //   errors.dateofBirth && {
          //     borderColor: Colors.red,
          //     borderWidth: 1,
          //     borderRadius: 5,
          //   },
          // ]}
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
            containerStyle={
              errors.frontPanImage ? {borderColor: Colors.red} : undefined
            }
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
            containerStyle={
              errors.backPanImage ? {borderColor: Colors.red} : undefined
            }
          />
        )}

        <UploadModal
          visible={isVisible}
          onClose={file => {
            if (file) {
              switch (uploadType) {
                case 'frontPanImage':
                  setFrontPanImage(file);
                  if (errors.frontPanImage)
                    setErrors(prev => ({...prev, frontPanImage: false}));
                  break;
                case 'backPanImage':
                  setBackPanImage(file);
                  if (errors.backPanImage)
                    setErrors(prev => ({...prev, backPanImage: false}));
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
