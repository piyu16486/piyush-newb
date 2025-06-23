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
  UploadModal,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {clientActions, clientSelector} from '@store/client';
import {HomeNavigatorType, KycNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type KycNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<KycNavigatorType>
>;

export const KYCFormSelection = () => {
  const navigation = useNavigation<KycNavigationType>();
  const {params} = useRoute<RouteProp<KycNavigatorType, 'KYCFormSelection'>>();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const kycChecked = useSelector(clientSelector.getkycChecked);

  const checkedKyc = () => {
    dispatch(clientActions.getKycChecked(params.clientID.toString()));
  };
  useEffect(() => {
    checkedKyc();
  }, []);

  const personalDocs = [
    {label: 'Upload your Picture', key: 'profile'},
    {label: 'PAN Card Details', key: 'pan'},
    {label: 'Aadhar Card Details', key: 'aadhaar'},
    {label: 'Residence Details', key: 'residence'},
  ];

  const businessDocs = [
    {label: 'Udhyam Certificate', key: 'udyam'},
    {label: 'GST Documents', key: 'gst'},
    {label: 'Godown Details', key: 'godown'},
    {label: 'Company PAN Card Details', key: 'company_pan'},
    {label: 'Shareholding Details', key: 'shareholding'},
    {label: 'Company Information', key: 'company_info'},
  ];

  const [activeTab, setActiveTab] = useState<'personal' | 'business' | 'bank'>(
    'personal',
  );

  const handleNavigation = (text: string) => {
    const navMap: {
      [key: string]:
        | 'KycUploadDoc'
        | 'KycUploadPan'
        | 'KycUploadAdhar'
        | 'ResidenceDetail';
    } = {
      'Upload your Picture': 'KycUploadDoc',
      'PAN Card Details': 'KycUploadPan',
      'Aadhar Card Details': 'KycUploadAdhar',
      'Residence Details': 'ResidenceDetail',
    };
    const screen = navMap[text];
    screen
      ? navigation.navigate(screen, {clientID: params.clientID})
      : console.warn('Screen not found for', text);
  };

  const handleNavigation2 = (text: string) => {
    const navMap: {[key: string]: keyof KycNavigatorType} = {
      'Udhyam Certificate': 'UdhyamCertificate',
      'GST Documents': 'GSTDocument',
      'Godown Details': 'GodownDetails',
      'Company PAN Card Details': 'CompanyPanCard',
      'Shareholding Details': 'ShareholdingCompany',
      'Company Information': 'CompanyDocument',
    };
    const screen = navMap[text];
    screen
      ? navigation.navigate(screen)
      : console.warn('Screen not found for', text);
  };

  const renderList = (
    docs: {label: string; key: string}[],
    handler: (label: string) => void,
  ) =>
    docs.map(({label, key}, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.card,
          kycChecked.includes(key)? {backgroundColor: Colors.frostedPlains} : {},
        ]}
        onPress={() => handler(label)}>
        <Text style={styles.cardText}>{label}</Text>
        {kycChecked.includes(key) ? (
          <RightCheckmark width={20} height={20} />
        ) : (
          <RightChevron width={20} height={17} />
        )}
      </TouchableOpacity>
    ));

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
            {renderList(
              personalDocs as {label: string; key: keyof typeof kycChecked}[],
              handleNavigation,
            )}
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
            {renderList(
              businessDocs as {label: string; key: keyof typeof kycChecked}[],
              handleNavigation2,
            )}
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
              onPress={() => setIsVisible(true)}
            />
            <UploadModal
              visible={isVisible}
              onClose={() => setIsVisible(false)}
            />
            <DashedButton
              label="Upload Statement"
              containerStyle={{marginTop: scaleHeight(15)}}
              onPress={() => setIsVisible(true)}
            />
            <UploadModal
              visible={isVisible}
              onClose={() => setIsVisible(false)}
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
                  style={styles.tab}
                  onPress={() => setActiveTab(key)}>
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
