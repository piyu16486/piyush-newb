import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AppBar, Container} from '@components/index';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {Search, Filter, Plus} from '@assets/Icons'; // Import your search and filter icons
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import {Colors} from '@constants/index';
import {ClientCard} from '@components/index';

const clientsData = [
  {
    id: '0001',
    name: 'S D Verma',
    location: 'Delhi',
    initiator: 'Delhi',
    source: 'Source D',
    referenceDetails: '9898923222',
    monthlyTurnover: '20,00,000',
    sanctionRequested: '25,00,000',
    financier: '10-02-2023',
    status: 'Warm',
  },
  {
    id: '0002',
    name: 'S D Verma',
    location: 'Delhi',
    initiator: 'Delhi',
    source: 'Source D',
    referenceDetails: '9898923222',
    monthlyTurnover: '20,00,000',
    sanctionRequested: '25,00,000',
    financier: '10-02-2023',
    status: 'Warm',
  },
  {
    id: '0003',
    name: 'S D Verma',
    location: 'Delhi',
    initiator: 'Delhi',
    source: 'Source D',
    referenceDetails: '9898923222',
    monthlyTurnover: '20,00,000',
    sanctionRequested: '25,00,000',
    financier: '10-02-2023',
    status: 'Warm',
  },
  {
    id: '0004',
    name: 'S D Verma',
    location: 'Delhi',
    initiator: 'Delhi',
    source: 'Source D',
    referenceDetails: '9898923222',
    monthlyTurnover: '20,00,000',
    sanctionRequested: '25,00,000',
    financier: '10-02-2023',
    status: 'Warm',
  },
  // Add more client data here...
];

export const ClientInfo = () => {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();

  return (
    <Container>
      {/* AppBar */}
      <AppBar title="Client Information Master" navigation={navigation} />

      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Client Information</Text>
      </View>
      <View style={styles.RowContainer}>
        <View style={styles.Subrowcontainer}>
          <Text style={styles.Subrowcontainertxt}>Clients</Text>
          <View style={styles.Badge}>
            <Text style={styles.Badgetext}>1025</Text>
          </View>
        </View>
        <View style={styles.Searchbox}>
          <Search height={12} width={12} />
          <TextInput
            style={styles.input}
            placeholder="Search Leads"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.Filterbox}>
          <View>
            <Filter height={12} width={12} />
          </View>
        </View>
      </View>
      <View style={styles.Cardlist}>
        <FlatList
          data={clientsData}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ClientCard {...item} />}
          contentContainerStyle={{flexGrow: 1}} // ✅ Prevents UI collapsing
        />
      </View>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('FormSelectionScreen')}>
        <Plus height={24} width={24} />
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  RowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // ✅ Ensures proper wrapping if needed
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  Subrowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Subrowcontainertxt: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.darkblack,
  },
  Badge: {
    backgroundColor: Colors.lightPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  Badgetext: {
    color: Colors.SteelGray,
  },
  Searchbox: {
    flex: 1,
    flexDirection: 'row',
    // width: scaleWidth(80),
    height: scaleHeight(29),
    marginLeft: 5,
    marginTop: 2,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EAECF0',
    borderWidth: 1,
    borderRadius: 3,
    gap: 16,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: scaleFont(12),
  },
  Filterbox: {
    width: scaleWidth(32),
    height: scaleHeight(30),
    backgroundColor: Colors.primaryColor,
    marginLeft: scaleWidth(8),
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cardlist: {
    flexGrow: 1,
    padding: 16,
  },
  plusButton: {
    position: 'absolute',
    bottom: scaleHeight(60),
    right: 30,
    backgroundColor: Colors.tertiaryBlue,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
