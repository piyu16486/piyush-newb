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
import {clientActions} from '@store/client';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const UdhyamCertificate = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<
    'frontImage' | 'backImage' | null
  >(null);
  const [udhyamAdharName, setUdhyamAdharName] = useState('');
  const [udhyamNumber, setUdhyamNumber] = useState('');
  const [udhyamFrontImage, setUdhyamFrontImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [udhyamBackImage, setUdhyamBackImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [errors, setErrors] = useState({
    udhyamAdharName: false,
    udhyamNumber: false,
    udhyamFrontImage: false,
    udhyamBackImage: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(
      udhyamAdharName,
      udhyamNumber,
      udhyamFrontImage,
      udhyamBackImage,
    );

    if (
      !udhyamAdharName ||
      !udhyamNumber ||
      !udhyamFrontImage ||
      !udhyamBackImage
    ) {
      setErrors({
        udhyamAdharName: !udhyamAdharName,
        udhyamNumber: !udhyamNumber,
        udhyamFrontImage: !udhyamFrontImage,
        udhyamBackImage: !udhyamBackImage,
      });

      let missingFields = [];
      if (!udhyamAdharName) missingFields.push('Udhyam AdharName');
      if (!udhyamNumber) missingFields.push('Udhyam Number');
      if (!udhyamFrontImage) missingFields.push('Udhyam FrontImage');
      if (!udhyamBackImage) missingFields.push('Udhyam BackImage');

      Alert.alert(
        'Missing Fields',
        `Please provide the following:\n${missingFields.join('\n')}`,
      );
      return;
    }

    setErrors({
      udhyamAdharName: false,
      udhyamNumber: false,
      udhyamFrontImage: false,
      udhyamBackImage: false,
    });

    const payload = {
      clientId: 22,
      uploaded_by: 'Nishith Upadhyay',
      doc: [
        {
          name: udhyamFrontImage.name ?? `${Date.now()}-front`,
          type: udhyamFrontImage.type ?? 'image/jpeg',
          uri: udhyamFrontImage.uri,
        },
        {
          name: udhyamBackImage.name ?? `${Date.now()}-back`,
          type: udhyamBackImage.type ?? 'image/jpeg',
          uri: udhyamBackImage.uri,
        },
      ],
      docDetails: {
        name_as_per_udhyam: udhyamAdharName,
        urn_number: udhyamNumber,
      },
    };

    console.log('Disp uploadUdhyamRequest:', payload);
    setLoading(true);
    dispatch(clientActions.uploadUdhyamRequest(payload));
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Document Uploaded',
        text2: `${udhyamAdharName}'s document submitted successfully`,
        position: 'top',
      });
      handleClear();
    }, 1500);
  };

  const handleClear = () => {
    setUdhyamAdharName('');
    setUdhyamNumber('');
    setUdhyamFrontImage(undefined);
    setUdhyamBackImage(undefined);
  };

  return (
    <Container>
      <AppBar title="KYC Document" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload Udhyam Certificate Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.scrollContainer}>
          {/* Main Content */}
          <Text style={styles.sectionTitle}>Udhyam Certificate</Text>
          <Input
            label="Name as per Udhyam Aadhar"
            value={udhyamAdharName}
            onChangeText={text => {
              setUdhyamAdharName(text);
              if (errors.udhyamAdharName && text.trim()) {
                setErrors(prev => ({...prev, udhyamAdharName: false}));
              }
            }}
            containerStyle={[
              {marginBottom: scaleHeight(24)},
              errors.udhyamAdharName && {
                borderColor: Colors.red,
                borderWidth: 1,
                borderRadius: 5,
              },
            ]}
          />
          <Input
            label="URN Number"
            value={udhyamNumber}
            onChangeText={text => {
              setUdhyamNumber(text);
              if (errors.udhyamNumber && text.trim()) {
                setErrors(prev => ({...prev, udhyamNumber: false}));
              }
            }}
            containerStyle={[
              {marginBottom: scaleHeight(14)},
              errors.udhyamNumber && {
                borderColor: Colors.red,
                borderWidth: 1,
                borderRadius: 5,
              },
            ]}
          />

          {udhyamFrontImage ? (
            <Text>File Name: {udhyamFrontImage.name}</Text>
          ) : (
            <DashedButton
              label="Upload Front Side of Udhyam"
              onPress={() => {
                setUploadType('frontImage');
                setIsVisible(true);
              }}
              containerStyle={
                errors.udhyamFrontImage ? {borderColor: Colors.red} : undefined
              }
            />
          )}

          {udhyamBackImage ? (
            <Text>File Name: {udhyamBackImage.name}</Text>
          ) : (
            <DashedButton
              label="Upload Back Side of Udhyam"
              onPress={() => {
                setUploadType('backImage');
                setIsVisible(true);
              }}
              containerStyle={
                errors.udhyamBackImage ? {borderColor: Colors.red} : undefined
              }
            />
          )}

          <UploadModal
            visible={isVisible}
            onClose={file => {
              if (file) {
                switch (uploadType) {
                  case 'frontImage':
                    setUdhyamFrontImage(file);
                    if (errors.udhyamFrontImage)
                      setErrors(prev => ({...prev, udhyamFrontImage: false}));
                    break;
                  case 'backImage':
                    setUdhyamBackImage(file);
                    if (errors.udhyamBackImage)
                      setErrors(prev => ({...prev, udhyamBackImage: false}));
                    break;
                }
              }
              setIsVisible(false);
              setUploadType(null);
            }}
          />

          {/* FooterButton */}
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
    padding: scaleWidth(24),
    paddingBottom: 80, // Extra padding to account for button height
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(14),
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: scaleHeight(20),
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
