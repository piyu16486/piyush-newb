/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {
  Container,
  AppBar,
  CustomDropdown,
  Button,
  LeadCard,
} from '@components/index';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {ScrollView} from 'react-native-gesture-handler';
import {Search} from '@assets/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/app/store';
import {clientActions} from '@store/client';

type SoftInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<SoftNavigatorType>
>;

type Lead = {
  clientId: string;
  clientName: string;
  location: string;
  initiator: string;
  turnover: string;
  creditPeriod: string;
};

export const SoftsanctionProcess = () => {
  const navigation = useNavigation<SoftInfoNavigationType>();
  const [search, setSearch] = useState<string>('');
  const [showLeads, setShowLeads] = useState(false);
  const dispatch = useDispatch();
  const bankList = useSelector((state: RootState) => state.client.BankList);

  useEffect(() => {
    dispatch(clientActions.getBankList());
  }, []);

  const formattedBankList = bankList.map(bank => ({
    label: bank.bank_name,
    value: bank.id.toString(),
  }));

  const leads: Lead[] = [
    {
      clientId: '0001',
      clientName: 'S D Verma',
      location: 'Delhi',
      initiator: 'Sahil Patel',
      turnover: '20,00,000',
      creditPeriod: '4',
    },
    {
      clientId: '0002',
      clientName: 'S D Verma',
      location: 'Delhi',
      initiator: 'Sahil Patel',
      turnover: '20,00,000',
      creditPeriod: '4',
    },
  ];

  const filteredLeads = leads.filter(lead =>
    lead.clientName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <AppBar title="Soft Sanction" navigation={navigation} />

      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Soft Sanction Process</Text>
      </View>
      <ScrollView>
        <View style={styles.head}>
          <Text style={styles.headText}>Ruleset ID Details</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Input label="Bank Name" /> */}
          <CustomDropdown
            label="Bank Name"
            data={formattedBankList}
            placeholder="Bank Name"
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          {/* <Input label="Product" /> */}
          <CustomDropdown
            label="Product"
            data={[
              {label: 'Option 1', value: 'option1'},
              {label: 'Option 2', value: 'option2'},
              {label: 'Option 3', value: 'option3'},
              {label: 'Option 4', value: 'option4'},
              {label: 'Option 5', value: 'option5'},
            ]}
            placeholder="Product Name"
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          {/* <Input label="Method" /> */}
          <CustomDropdown
            label="Method"
            data={[
              {label: 'Option 1', value: 'option1'},
              {label: 'Option 2', value: 'option2'},
              {label: 'Option 3', value: 'option3'},
              {label: 'Option 4', value: 'option4'},
              {label: 'Option 5', value: 'option5'},
            ]}
            placeholder="Method Name"
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          {/* <Input label="Rulest ID" /> */}
          <CustomDropdown
            label="Rulest ID"
            data={[
              {label: 'Option 1', value: 'option1'},
              {label: 'Option 2', value: 'option2'},
              {label: 'Option 3', value: 'option3'},
              {label: 'Option 4', value: 'option4'},
              {label: 'Option 5', value: 'option5'},
            ]}
            placeholder="All Rules Set IDs here of bank, PID, Method"
          />
        </View>
        <Button
          buttonText={'View Rulset'}
          style={styles.button}
          onPress={() => setShowLeads(true)} // SoftSanctionRuleset | RulesetTCPD | UGROPurchaseMethod | UGROTurnoverMethod | to navigate other screen "navigation.navigate('SoftSanctionRuleset')"
        />
        {showLeads && (
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <View style={styles.titleWithBadge}>
                <Text style={styles.header}>Leads</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{leads.length}</Text>
                </View>
              </View>
              <View style={styles.searchContainer}>
                <Search width={16} height={16} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Leads"
                  value={search}
                  onChangeText={setSearch}
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <FlatList
              data={filteredLeads}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => <LeadCard lead={item} />}
              contentContainerStyle={{paddingBottom: 20}}
            />
          </View>
        )}
      </ScrollView>
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
  head: {
    padding: scaleHeight(16),
    marginTop: scaleHeight(10),
  },
  headText: {
    fontSize: scaleFont(16),
    color: Colors.graybase,
    fontWeight: fontWeight.SemiBold,
  },
  inputContainer: {
    margin: scaleHeight(16),
    marginTop: scaleHeight(24),
  },
  button: {
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(16),
    marginLeft: scaleWidth(189),
    marginRight: scaleWidth(35),
    alignSelf: 'flex-end',
    paddingVertical: scaleHeight(8),
    borderRadius: 4,
  },
  container: {
    padding: 16,
    backgroundColor: '#fafafa',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // optional, in case screen is narrow
    marginBottom: 10,
  },
  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: '#fdeef1',
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  countText: {
    color: Colors.SteelGray,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 40,
    // flex: 1,
    marginLeft: 10,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    // flex: 1,
    padding: 10,
    color: '#000',
  },
});
