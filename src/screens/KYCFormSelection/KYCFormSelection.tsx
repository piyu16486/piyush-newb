/* eslint-disable @typescript-eslint/no-unused-vars */
// KYCFormSelection

// KycScreen.tsx
import {RightCheckmark, RightChevron} from '@assets/Icons';
import {
  AppBar,
  Container,
  CustomDropdown,
  DashedButton,
  Input,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const KYCFormSelection = () => {
  const navigation = useNavigation<KycNavigationType>();

  const [activeTab, setActiveTab] = useState<'personal' | 'business' | 'bank'>(
    'personal',
  );

  const handleNavigation = (text: string) => {
    switch (text) {
      case 'Upload your Picture':
        navigation.navigate('KycUploadDoc');
        break;
      case 'PAN Card Details':
        navigation.navigate('KycUploadPan');
        break;
      case 'Aadhar Card Details':
        navigation.navigate('KycUploadAdhar');
        break;
      case 'Residence Details':
        navigation.navigate('KycOwner');
        break;
      default:
        console.warn('Screen not found for', text);
    }
  };

  const handleNavigation2 = (text: string) => {
    switch (text) {
      case 'Udhyam Certificate':
        navigation.navigate('UdhyamCertificate');
        break;
      case 'GST Documents':
        navigation.navigate('GSTDocument');
        break;
      case 'Godown Details':
        navigation.navigate('GodownDetails');
        break;
      case 'Godown Details2':
        navigation.navigate('GodownDetails2');
        break;
      case 'Company PAN Card Details':
        navigation.navigate('CompanyPanCard');
        break;
      case 'Shareholding Details':
        navigation.navigate('ShareholdingCompany');
        break;
      case 'Company Information':
        navigation.navigate('CompanyDocument');
        break;
      default:
        console.warn('Screen not found for', text);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <View>
            <Text style={styles.heading}>
              Let’s Verify and Upload Documents
            </Text>
            <Text style={styles.subHeading}>
              Please Submit the following documents to verify your profile
            </Text>
            {[
              'Upload your Picture',
              'PAN Card Details',
              'Aadhar Card Details',
              'Residence Details',
            ].map((text, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleNavigation(text)}>
                <Text style={styles.cardText}>{text}</Text>
                <RightChevron width={20} height={17} />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'business':
        return (
          <View>
            <Text style={styles.heading}>
              Let’s Verify and Upload Documents
            </Text>
            <Text style={styles.subHeading}>
              Please Submit the following documents to verify your profile
            </Text>
            {[
              'Udhyam Certificate',
              'GST Documents',
              'Godown Details',
              'Godown Details2',
              'Company PAN Card Details',
              'Shareholding Details',
              'Company Information',
            ].map((text, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => handleNavigation2(text)}>
                <Text style={styles.cardText}>{text}</Text>
                <RightChevron width={20} height={17} />
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'bank':
        return (
          <View>
            <Text style={styles.heading}>Bank Statement of Last 12 Months</Text>
            <Input
              label="Bank Name"
              containerStyle={{marginBottom: scaleHeight(20)}}
            />
            <Input
              label="Account Number"
              containerStyle={{marginBottom: scaleHeight(20)}}
            />
            {/* <Input label="Account Type" /> */}
            <CustomDropdown
              label="Account Type"
              containerStyle={{marginBottom: scaleHeight(20)}}
            />
            <CustomDropdown
              label="Reporting Period"
              containerStyle={{marginBottom: scaleHeight(20)}}
            />
            <Input
              label="Start and End Date of Statement"
              placeholder="Start Date"
            />
            <Input placeholder="End Date" />

            <DashedButton
              label="Upload Statement"
              containerStyle={{marginTop: scaleHeight(20)}}
            />
            <DashedButton
              label="Upload Statement"
              containerStyle={{marginTop: scaleHeight(15)}}
            />
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
                  <Text style={[styles.saveText, {color: Colors.green}]}>
                    Save
                  </Text>
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
        );
    }
  };

  return (
    <Container>
      <AppBar title="Kyc Document" navigation={navigation} />
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Kyc Document</Text>
      </View>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {['Personal KYC', 'Business KYC', 'Bank Statement'].map(
            (label, index) => {
              const key = label.toLowerCase().split(' ')[0] as
                | 'personal'
                | 'business'
                | 'bank';
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => setActiveTab(key)}
                  style={styles.tab}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === key && styles.activeTabText,
                    ]}>
                    {label}
                  </Text>
                  {activeTab === key && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              );
            },
          )}
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primaryColor,
    fontWeight: fontWeight.SemiBold,
  },
  activeIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginBottom: 24,
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  cardText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
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
