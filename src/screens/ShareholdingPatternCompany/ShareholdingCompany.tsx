/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const ShareholdingCompany = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [shareholdingImage, setShareholdingImage] = useState<
    DocumentPickerResponse | undefined
  >();
  const [errors, setErrors] = useState({
    companyName: false,
    shareholdingImage: false,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(companyName, shareholdingImage);
    if (!companyName || !shareholdingImage) {
      setErrors({
        companyName: !companyName,
        shareholdingImage: !shareholdingImage,
      });

      Alert.alert(
        'Missing Fields',
        !companyName && !shareholdingImage
          ? 'Please provide following documents.'
          : `${!companyName ? 'Company Name' : 'Image'} is required.`,
      );
      return;
    }
    setErrors({
      companyName: false,
      shareholdingImage: false,
    });

    const payload = {
      clientId: 22,
      uploaded_by: 'Nishith Upadhyay',
      client_name: companyName,
      doc: {
        name: shareholdingImage.name ?? Date.now().toString(),
        type: shareholdingImage.type ?? 'image.png',
        uri: shareholdingImage.uri,
      },
      params: 'ShareHolding',
    };
    console.log('Disp uploadShareholdingRequest', payload);
    setLoading(true);
    dispatch(clientActions.uploadShareholdingRequest(payload));
    setLoading(false);
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Document Uploaded',
        text2: `${companyName}'s document submitted successfully`,
        position: 'top',
      });
      handleClear();
    }, 1500);
  };

  const handleClear = () => {
    setCompanyName('');
    setShareholdingImage(undefined);
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Kyc Document</Text>
      </View>
      <View style={styles.mainContainer}>
        <View>
          {/* Main Content */}
          <Text style={styles.sectionTitle}>
            Shareholding Pattern of Company
          </Text>
        </View>
        <Input
          label="Company Name"
          value={companyName} // setCompanyName
          onChangeText={text => {
            setCompanyName(text);
            if (errors.companyName)
              setErrors(prev => ({...prev, companyName: false}));
          }}
          containerStyle={[
            {marginBottom: scaleHeight(20)},
            errors.companyName && {
              borderColor: Colors.red,
              borderWidth: 1,
              borderRadius: 5,
            },
          ]}
        />

        {shareholdingImage ? (
          <Text>File Name: {shareholdingImage.name}</Text>
        ) : (
          <DashedButton
            label="Upload Shareholding Pattern"
            onPress={() => setIsVisible(true)}
            containerStyle={
              errors.shareholdingImage ? {borderColor: Colors.red} : undefined
            }
          />
        )}

        <UploadModal
          visible={isVisible}
          onClose={file => {
            if (file) {
              setShareholdingImage(file);
              if (errors.shareholdingImage)
                setErrors(prev => ({...prev, image: false}));
            }
            setIsVisible(false);
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
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(16),
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
