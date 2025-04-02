import React from 'react';
import {AppBar, Container} from '@components/index';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleFont} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import Colors from '@constants/Colors';
import {LeftChevronCircle, RightChevron} from '@assets/Icons';

// Type Definition for Navigation and Data
type ListItemProps = {
  title: string;
  screen: keyof HomeNavigatorType;
};

// Sample Data Array
const DATA: ListItemProps[] = [
  {title: 'Basic Details', screen: 'BasicDetailsScreen'},
  {title: 'Client & Firm Details', screen: 'ClientFirmScreen'},
  {title: 'Vendor Details', screen: 'VendorScreen'},
  {title: 'Visit Details', screen: 'VisitScreen'},
];

// Reusable List Item Component (Optimized with React.memo)
const ListItem = React.memo(({title, screen}: ListItemProps) => {
  const navigation = useNavigation<DrawerNavigationProp<HomeNavigatorType>>();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(screen)}>
      <Text style={styles.text}>{title}</Text>
      <RightChevron height={17} width={20} />
    </TouchableOpacity>
  );
});

export const FormSelectionScreen: React.FC = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();

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
        <FlatList
          data={DATA}
          keyExtractor={item => item.screen}
          renderItem={({item}) => <ListItem {...item} />}
          showsVerticalScrollIndicator={false} // Hide scrollbar for cleaner UI
        />
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
    marginTop: 71,
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
