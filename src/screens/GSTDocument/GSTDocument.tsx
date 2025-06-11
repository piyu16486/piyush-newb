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
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const GSTDocument = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [nameonGstCertificate, setNameonGstCertificate] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstImage, setGstImage] = useState<
    DocumentPickerResponse | undefined
  >();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(nameonGstCertificate, gstNumber, gstImage);

    const allFieldsFilled = nameonGstCertificate && gstNumber && gstImage;

    if (!allFieldsFilled) {
      console.warn('Please fill all GST details and upload the image.');
      Alert.alert(
        'Validation Error',
        'Please fill all fields and upload the GST image.',
      );
      return;
    }

    const payload = {
      clientId: 22,
      uploaded_by: 'Nishith Upadhyay',
      doc: {
        uri: gstImage.uri,
        name: gstImage.name ?? `${Date.now()}-gst.jpg`,
        type: gstImage.type ?? 'image/jpeg',
      },
      name_as_per_gst: nameonGstCertificate,
      gst_number: gstNumber,
      params: 'GST',
    };

    console.log('Dispatching uploadGstRequest:', payload);
    dispatch(clientActions.uploadGstRequest(payload));
  };

  const handleClear = () => {
    setNameonGstCertificate('');
    setGstNumber('');
    setGstImage(undefined);
  };

  return (
    <Container>
      <AppBar title="KYC Document" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Upload GST Document Details</Text>
      </View>
      <View style={styles.mainContainer}>
        <View>
          {/* Main Content */}
          <Text style={styles.sectionTitle}>GST Document</Text>
          <Input
            label="Name as per GST Certificate"
            value={nameonGstCertificate}
            onChangeText={setNameonGstCertificate}
            containerStyle={{marginBottom: scaleHeight(24)}}
          />
          <Input
            label="GST Number"
            value={gstNumber}
            onChangeText={setGstNumber}
            containerStyle={{marginBottom: scaleHeight(14)}}
          />

          {gstImage ? (
            <Text>File Name: {gstImage.name}</Text>
          ) : (
            <DashedButton
              label="Upload GST Certificate"
              onPress={() => setIsVisible(true)}
            />
          )}

          <UploadModal
            visible={isVisible}
            onClose={file => {
              if (file) {
                setGstImage(file);
              }
              setIsVisible(false);
            }}
          />
        </View>

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
  mainContainer: {
    flex: 1,
    padding: scaleWidth(24),
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
    // padding: 24,
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
