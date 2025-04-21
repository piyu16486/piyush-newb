import React from 'react';
import {AppBar, Container} from '@components/index';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleFont} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import Colors from '@constants/Colors';
import {LeftChevronCircle, RightChevron} from '@assets/Icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Type Definition for Navigation and Data
type ListItemProps = {
  title:
    | 'Basic Details'
    | 'Client & Firm Details'
    | 'Vendor Details'
    | 'Visit Details';
  screen: 'BasicDetails' | 'ClientFirmScreen' | 'VendorScreen' | 'VisitScreen';
};

// Sample Data Array
const DATA: ListItemProps[] = [
  {title: 'Basic Details', screen: 'BasicDetails'},
  {title: 'Client & Firm Details', screen: 'ClientFirmScreen'},
  {title: 'Vendor Details', screen: 'VendorScreen'},
  {title: 'Visit Details', screen: 'VisitScreen'},
];

type NavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<ClientNavigatorType, 'FormSelectionScreen'>
>;

export const FormSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationType>();

  return (
    <Container>
      {/* App Bar with Title */}
      <AppBar title="Client Information Master" navigation={navigation} />

      {/* Subheader Section */}
      <View>
        <TouchableOpacity
          style={styles.subcontainer}
          onPress={navigation.goBack}>
          <LeftChevronCircle height={26} width={26} />
          <Text style={styles.subheader}>Collect Lead Information</Text>
        </TouchableOpacity>
      </View>

      {/* List Section */}
      <View style={styles.container}>
        {DATA.map(item => (
          <TouchableOpacity
            key={item.title}
            style={styles.item}
            onPress={() =>
              navigation.navigate('InputFormField', {
                screen: item.screen,
                title: item.title,
              })
            }>
            <Text style={styles.text}>{item.title}</Text>
            <RightChevron height={17} width={20} />
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

// Styles
const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1, // Added border
    borderColor: '#CBCED5', // Border color as requested
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray500,
  },
});
