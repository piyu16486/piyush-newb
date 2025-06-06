import {RightCheckmark} from '@assets/Icons';
import {AppBar, Container, DashedButton, UploadModal} from '@components/index';
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

export const CompanyDocument = () => {
  const navigation = useNavigation<KycNavigationType>();
  const [isVisible, setIsVisible] = useState(false);
  const [uploadType, setUploadType] = useState<
    'aoaDoc' | 'moaDoc' | 'coiDoc' | 'otherDoc' | null
  >(null);
  const [aoaDocument, setAoaDocument] = useState<
    DocumentPickerResponse | undefined
  >();
  const [moaDocument, setMoaDocument] = useState<
    DocumentPickerResponse | undefined
  >();
  const [coiDocument, setCoiDocument] = useState<
    DocumentPickerResponse | undefined
  >();
  const [otherDocument, setOtherDocument] = useState<
    DocumentPickerResponse | undefined
  >();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(aoaDocument, moaDocument, coiDocument, otherDocument);

    const allFieldsFilled =
      aoaDocument && moaDocument && coiDocument && otherDocument;

    if (allFieldsFilled) {
      const payload = {
        clientId: 16,
        uploaded_by: 'Nishith Upadhyay',
        doc: [
          {
            uri: aoaDocument.uri,
            name: aoaDocument.name ?? Date.now().toString(),
            type: aoaDocument.type ?? 'image/png',
          },
          {
            uri: moaDocument.uri,
            name: moaDocument.name ?? Date.now().toString(),
            type: moaDocument.type ?? 'image/png',
          },
          {
            uri: coiDocument.uri,
            name: coiDocument.name ?? Date.now().toString(),
            type: coiDocument.type ?? 'image/png',
          },
          {
            uri: otherDocument.uri,
            name: otherDocument.name ?? Date.now().toString(),
            type: otherDocument.type ?? 'image/png',
          },
        ],
      };

      console.log('Disp uploadCompanyInfoRequest', payload);
      dispatch(clientActions.uploadCompanyInfoRequest(payload));
    } else {
      console.warn('Please fill all required images of Company Document');
    }
  };

  const handleClear = () => {
    setAoaDocument(undefined);
    setMoaDocument(undefined);
    setCoiDocument(undefined);
    setOtherDocument(undefined);
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Kyc Document</Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {/* Main Applicant Section */}
          <Text style={styles.sectionTitle}>Company Documents</Text>

          <Text style={styles.subTitle}>AOA</Text>

          {aoaDocument ? (
            <Text>File Name: {aoaDocument.name}</Text>
          ) : (
            <DashedButton
              label="Upload AOA Document"
              onPress={() => {
                setUploadType('aoaDoc');
                setIsVisible(true);
              }}
            />
          )}

          <Text style={styles.subTitle}>MOA</Text>
          {moaDocument ? (
            <Text>File Name: {moaDocument.name}</Text>
          ) : (
            <DashedButton
              label="Upload MOA Document"
              onPress={() => {
                setUploadType('moaDoc');
                setIsVisible(true);
              }}
            />
          )}

          <Text style={styles.subTitle}>COI</Text>
          {coiDocument ? (
            <Text>File Name: {coiDocument.name}</Text>
          ) : (
            <DashedButton
              label="Upload COI Document"
              onPress={() => {
                setUploadType('coiDoc');
                setIsVisible(true);
              }}
            />
          )}

          <Text style={styles.subTitle}>Other Document</Text>
          {otherDocument ? (
            <Text>File Name: {otherDocument.name}</Text>
          ) : (
            <DashedButton
              label="Upload Other Document"
              onPress={() => {
                setUploadType('otherDoc');
                setIsVisible(true);
              }}
            />
          )}

          <UploadModal
            visible={isVisible}
            onClose={file => {
              if (file) {
                switch (uploadType) {
                  case 'aoaDoc':
                    setAoaDocument(file);
                    break;
                  case 'moaDoc':
                    setMoaDocument(file);
                    break;
                  case 'coiDoc':
                    setCoiDocument(file);
                    break;
                  case 'otherDoc':
                    setOtherDocument(file);
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
        </ScrollView>
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
  scrollContainer: {
    padding: scaleWidth(24),
    paddingBottom: 100, // Extra padding to account for button row
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginVertical: 10,
    marginBottom: scaleHeight(20),
  },
  subTitle: {
    marginVertical: 10,
    fontSize: scaleFont(14),
    fontWeight: fontWeight.SemiBold,
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
