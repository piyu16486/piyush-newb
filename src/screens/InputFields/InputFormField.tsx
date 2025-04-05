import {LeftChevronCircle, RightCheckmark} from '@assets/Icons';
import {RightChevronCircle} from '@assets/Icons/RightChevronCircle';
import {AppBar, Container, Input} from '@components/index';
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
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
    {label: 'Client Name'},
    {label: 'Firm Name'},
    {label: 'CIBIL Score'},
    {label: 'Facility Type'},
    {label: 'Business Vintage'},
  ],
  VendorScreen: [{label: 'Vendor Name'}, {label: 'Vendor Address'}],
  VisitScreen: [{label: 'Visit Date'}, {label: 'Visit Time'}],
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
  const [formIndex, setFormIndex] = React.useState(
    Forms.indexOf(params.screen),
  );
  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      {/* Subheader Section */}
      <View>
        <TouchableOpacity
          style={styles.subcontainer}
          onPress={navigation.goBack}>
          <LeftChevronCircle height={26} width={26} />
          <Text style={styles.subheader}>{params.title}</Text>
        </TouchableOpacity>
      </View>
      {/*Form Content*/}
      <ScrollView>
        <View style={styles.inputContainer}>
          {formInputDetails[Forms[formIndex]].map(item => (
            <Input label={item.label} key={item.label.toString()} />
          ))}
        </View>
      </ScrollView>
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
            <Text style={[styles.saveText, {color: Colors.green}]}>Save</Text>
          </TouchableOpacity>

          {formIndex === Forms.length - 1 ? (
            // Submit Button
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.7}
              onPress={() => console.log('Next Pressed')}>
              <Text style={styles.saveText}>Submit</Text>
              <RightCheckmark width={12} height={12} />
            </TouchableOpacity>
          ) : (
            // Next Button
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                if (formIndex < Forms.length - 1) {
                  setFormIndex(formIndex + 1);
                }
              }}>
              <Text style={styles.nextText}>Next</Text>
              <View style={styles.iconWrapper}>
                <RightChevronCircle width={24} height={24} />
              </View>
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
    paddingLeft: 16, // Spacing from the left
    paddingVertical: 12,
  },
  subheader: {
    marginLeft: 12, // Space between icon and text
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
  pressed: {
    opacity: 0.7,
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
  wrappercontainer: {
    marginTop: 16,
    alignItems: 'flex-start', // Align button to the left
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: Colors.darkGray,
    fontWeight: '500',
  },
});
