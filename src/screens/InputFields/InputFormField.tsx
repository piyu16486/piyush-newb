/* eslint-disable react-native/no-inline-styles */
import {LeftChevronCircle, Plus, RightCheckmark} from '@assets/Icons';
import {RightChevronCircle} from '@assets/Icons/RightChevronCircle';
import {
  AppBar,
  Container,
  CustomDropdown,
  DateNTimePicker,
  Input,
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
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const formInputDetails = {
  BasicDetails: [
    {label: 'Source of Lead'},
    {label: 'Location'},
    {label: 'City'},
    {label: 'State'},
    {label: 'Type of Visit'},
    {label: 'Visit Number'},
    {label: 'Date of Visit'},
    {label: 'File By'},
  ],
  ClientFirmScreen: [
    {label: 'Name of Client'},
    {label: 'Firm Name'},
    {label: 'Contact number'},
    {label: 'Type of Firm'},
    {label: 'Business Vintage'},
    {label: 'Sector'},
    {label: 'Bank Name'},
    {label: 'CIBIL Score'},
    {label: 'Facility Type'},
    {label: 'Existing Funding Sanctioned Amt'},
    {label: 'Estimated Funding Required'},
    {label: 'Credit Period Offer'},
  ],
  VendorScreen: [
    {label: 'Product'},
    {label: 'Vendor Name'},
    {label: 'Vendor Contact number'},
    {label: 'Vendor Contact Email'},
    {label: 'Monthly Sales Value'},
  ],
  VisitScreen: [
    {label: 'Intent'},
    {label: 'Visit Remarks'},
    {label: 'Date of Next Visit'},
    {label: 'Reason for Not Interested'},
    {label: 'Are you interested for?'},
  ],
};

const Forms = Object.keys(formInputDetails) as Array<
  keyof typeof formInputDetails
>;

type NavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<ClientNavigatorType, 'InputFormField'>
>;

export const InputFormField = () => {
  const navigation = useNavigation<NavigationType>();
  const {params} = useRoute<RouteProp<ClientNavigatorType, 'InputFormField'>>();
  const [visitDate, setVisitDate] = useState<Date | undefined>(undefined);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const [formIndex, setFormIndex] = React.useState(
    Forms.indexOf(params.screen),
  );

  const formTitles: Record<string, string> = {
    BasicDetails: 'Basic Details',
    ClientFirmScreen: 'Client & Firm Details',
    VendorScreen: 'Vendor Details',
    VisitScreen: 'Visit Details',
  };

  const currentFormKey = Forms[formIndex];
  const currentTitle = formTitles[currentFormKey] || 'Form Section';

  const [vendorEntries, setVendorEntries] = React.useState([{id: Date.now()}]);

  const initialFormState = formInputDetails[currentFormKey].reduce(
    (acc, field) => {
      acc[field.label] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const [formValues, setFormValues] = useState(initialFormState);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    formInputDetails[currentFormKey].forEach(field => {
      const value = formValues[field.label];

      if (!value || value.trim() === '') {
        errors[field.label] = `${field.label} is required`;
      }
      if (field.label === 'Vendor Contact Email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field.label] = 'Enter a valid email';
        }
      }
      if (
        field.label.toLowerCase().includes('contact') &&
        value &&
        !/^\d{10}$/.test(value)
      ) {
        errors[field.label] = 'Enter a valid 10-digit number';
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View>
        <TouchableOpacity
          style={styles.subcontainer}
          onPress={navigation.goBack}>
          <LeftChevronCircle height={26} width={26} />
          <Text style={styles.subheader}>{currentTitle}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          {currentFormKey === 'VendorScreen'
            ? vendorEntries.map((vendor, index) => (
                <View key={vendor.id} style={{marginBottom: 20}}>
                  {formInputDetails.VendorScreen.map(field => {
                    const isDropdown = ['Product'].includes(field.label);
                    if (isDropdown) {
                      const dropdownData = [
                        {label: 'Option 1', value: 'option1'},
                        {label: 'Option 2', value: 'option2'},
                      ];
                      return (
                        <CustomDropdown
                          key={`${field.label}-${index}`}
                          label={`${field.label} ${
                            vendorEntries.length > 1 ? index + 1 : ''
                          }`}
                          data={dropdownData}
                          placeholder="Select Type"
                          onChange={val =>
                            console.log(`${field.label} selected:`, val)
                          }
                        />
                      );
                    }
                    return (
                      <Input
                        key={`${field.label}-${index}`}
                        label={`${field.label} ${
                          vendorEntries.length > 1 ? index + 1 : ''
                        }`}
                        containerStyle={{marginTop: scaleHeight(14)}}
                      />
                    );
                  })}
                </View>
              ))
            : formInputDetails[Forms[formIndex]].map(item => {
                const dropdownFields = [
                  'Type of Visit',
                  'City',
                  'State',
                  'Sector',
                  'Source of Lead',
                  'Are you interested for?',
                  'File By',
                  'Type of Firm',
                  'Facility Type',
                  'Intent',
                ];
                if (dropdownFields.includes(item.label)) {
                  const dropdownData = [
                    {label: 'Option 1', value: 'option1'},
                    {label: 'Option 2', value: 'option2'},
                  ];
                  return (
                    <View key={item.label}>
                      <CustomDropdown
                        label={item.label}
                        data={dropdownData}
                        placeholder="Select Type"
                        value={formValues[item.label]}
                        onChange={val =>
                          setFormValues(prev => ({...prev, [item.label]: val}))
                        }
                        style={{
                          borderColor: formErrors[item.label]
                            ? 'red'
                            : undefined,
                        }}
                      />
                      {formErrors[item.label] && (
                        <Text
                          style={{color: 'red', marginTop: 4, marginLeft: 4}}>
                          {formErrors[item.label]}
                        </Text>
                      )}
                    </View>
                  );
                }
                if (item.label === 'Date of Visit') {
                  return (
                    <DateNTimePicker
                      key={item.label}
                      label="Date of Visit"
                      mode="date"
                      value={visitDate}
                      onConfirm={val => setVisitDate(val)}
                    />
                  );
                }

                if (item.label === 'Date of Next Visit') {
                  return (
                    <DateNTimePicker
                      key={item.label}
                      label="Date of Next Visit"
                      mode="date"
                      value={visitDate}
                      onConfirm={val => setVisitDate(val)}
                    />
                  );
                }
                return (
                  <View key={item.label}>
                    <Input
                      label={item.label}
                      value={formValues[item.label]}
                      onChangeText={text =>
                        setFormValues(prev => ({...prev, [item.label]: text}))
                      }
                      containerStyle={{marginTop: scaleHeight(14)}}
                      style={{
                        borderColor: formErrors[item.label] ? 'red' : undefined,
                      }}
                    />
                    {formErrors[item.label] && (
                      <Text style={{color: 'red', marginTop: 4, marginLeft: 4}}>
                        {formErrors[item.label]}
                      </Text>
                    )}
                  </View>
                );
              })}

          {currentFormKey === 'VendorScreen' && (
            <TouchableOpacity
              style={styles.vendorButton}
              onPress={() =>
                setVendorEntries(prev => [...prev, {id: Date.now()}])
              }>
              <Text style={styles.vendorButtonText}>Add Vendor</Text>
              <Plus width={18} height={18} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <View style={styles.footerButton}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setFormValues(initialFormState);
            setVisitDate(undefined);
            if (currentFormKey === 'VendorScreen') {
              setVendorEntries([{id: Date.now()}]);
            }
          }}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: Colors.white}]}
            activeOpacity={0.7}
            onPress={() => console.log('Save Pressed')}>
            <Text style={[styles.saveText, {color: Colors.green}]}>Save</Text>
          </TouchableOpacity>
          {formIndex === Forms.length - 1 ? (
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.7}
              disabled={isLoading}
              onPress={() => {
                if (validateForm()) {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    console.log('Form submitted successfully');
                    // Replace with actual navigation or logic
                  }, 2000); // simulate 2s loading
                }
              }}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <>
                  <Text style={styles.saveText}>Submit</Text>
                  <RightCheckmark width={12} height={12} />
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              disabled={isLoading}
              onPress={() => {
                if (validateForm()) {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    if (formIndex < Forms.length - 1) {
                      setFormIndex(prev => prev + 1);
                    }
                  }, 2000); // simulate 2s loading
                }
              }}>
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.white}
                  style={styles.loaderFull}
                />
              ) : (
                <>
                  <Text style={styles.nextText}>Next</Text>
                  <View style={styles.iconWrapper}>
                    <RightChevronCircle width={24} height={24} />
                  </View>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LimeGray,
    paddingLeft: 16,
    paddingVertical: 12,
  },
  subheader: {
    marginLeft: 12,
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: '#333',
  },
  inputContainer: {
    marginHorizontal: scaleWidth(24),
    marginTop: scaleHeight(17),
    gap: scaleHeight(20),
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  clearButton: {
    paddingHorizontal: 10,
  },
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
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: Colors.blueGray700,
    fontSize: 16,
    marginStart: scaleWidth(10),
  },
  iconWrapper: {
    backgroundColor: '#EAEAEA',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginHorizontal: scaleWidth(12),
  },
  vendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.graybase,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginTop: scaleHeight(10),
    gap: 8,
  },
  vendorButtonText: {
    color: '#6E6E78',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  loaderFull: {
    alignSelf: 'center',
  },
});
