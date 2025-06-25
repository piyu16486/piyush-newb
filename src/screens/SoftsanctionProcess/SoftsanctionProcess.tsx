/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, FlatList, TextInput, Alert} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
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
import {CompositeNavigationProp, useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {ScrollView} from 'react-native-gesture-handler';
import {Search} from '@assets/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/app/store';
import {clientActions} from '@store/client';
import clientSelector from '@store/client/client.selector';

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
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [selectedRulesetId, setSelectedRulesetId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const bankList = useSelector((state: RootState) => state.client.BankList);
  const methodList = useSelector((state: RootState) => state.client.SoftSanctionBNKPROData);
  const softSanctionClientList = useSelector(clientSelector.getSoftSanctionClientList);
  const softSanctionClientLoading = useSelector(clientSelector.getSoftSanctionClientLoading);
  const softSanctionClientError = useSelector(clientSelector.getSoftSanctionClientError);

  useEffect(() => {
    dispatch(clientActions.getBankList());
  }, []);

  useEffect(() => {
    if (selectedBank && selectedProduct) {
      const bank = bankList.find(b => b.id.toString() === selectedBank);
      if (bank) {
        dispatch({
          type: clientActions.getSoftSanctionBnkPro.type,
          payload: { bank: bank.bank_name.trim(), product: selectedProduct },
        });
      }
    }
  }, [selectedBank, selectedProduct]);

  useEffect(() => {
    if (selectedMethod && methodList.length > 0) {
      const method = methodList.find(m => m.method_name === selectedMethod);
      if (method) {
        setSelectedRulesetId(method.soft_sanction_ruleset_id);
      } else {
        setSelectedRulesetId(null);
      }
    } else {
      setSelectedRulesetId(null);
    }
  }, [selectedMethod, methodList]);

  useFocusEffect(
    useCallback(() => {
      if (showLeads) {
        dispatch(clientActions.getSoftSanctionClientList());
      }
    }, [showLeads, dispatch])
  );

  const formattedBankList = bankList.map(bank => ({
    label: bank.bank_name.trim(),
    value: bank.id.toString(),
  }));

  const formattedMethodList = methodList.map(method => ({
    label: method.method_name,
    value: method.method_name,
  }));

  const formattedRulesetIdList = methodList
    .filter(method => method.method_name === selectedMethod)
    .map(method => ({
      label: method.soft_sanction_ruleset_id,
      value: method.soft_sanction_ruleset_id,
    }));

  const filteredLeads = softSanctionClientList
    .map(lead => ({
      clientId: lead.id?.toString() || 'NA',
      clientName: lead.client_name || 'NA',
      location: lead.location || 'NA',
      initiator: lead.user?.name || 'NA',
      turnover: lead.monthly_turnover || 'NA',
      creditPeriod: lead.credit_period_offer?.toString() || 'NA',
    }))
    .filter(lead =>
      lead.clientName.toLowerCase().includes(search.toLowerCase())
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
          <CustomDropdown
            label="Bank Name"
            data={formattedBankList}
            placeholder="Bank Name"
            value={selectedBank ?? undefined}
            onChange={val => {
              setSelectedBank(val);
              setSelectedMethod(null);
              setSelectedRulesetId(null);
            }}
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          <CustomDropdown
            label="Product"
            data={[
              {label: 'PID', value: 'PID'},
              {label: 'VF', value: 'VF'},
              {label: 'DF', value: 'DF'},
            ]}
            placeholder="Product Name"
            value={selectedProduct ?? undefined}
            onChange={val => {
              setSelectedProduct(val);
              setSelectedMethod(null);
              setSelectedRulesetId(null);
            }}
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          <CustomDropdown
            label="Method"
            data={formattedMethodList}
            placeholder="Method Name"
            value={selectedMethod ?? undefined}
            onChange={val => setSelectedMethod(val)}
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
          <CustomDropdown
            label="Rulest ID"
            data={formattedRulesetIdList}
            placeholder="All Rules Set IDs here of bank, PID, Method"
            value={selectedRulesetId ?? undefined}
            onChange={val => setSelectedRulesetId(val)}
            containerStyle={{marginBottom: scaleHeight(20)}}
          />
        </View>
        <Button
          buttonText={'View Rulset'}
          style={styles.button}
          onPress={() => {
            setShowLeads(true);
            const bank = bankList.find(b => b.id.toString() === selectedBank);
            navigation.navigate('SoftSanctionRuleset', {
              bankName: bank ? bank.bank_name.trim() : '',
              product: selectedProduct ?? '',
            } as any);
          }}
        />
        {showLeads && (
          <View style={styles.container}>
            <View style={styles.headerRow}>
              <View style={styles.titleWithBadge}>
                <Text style={styles.header}>Leads</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{softSanctionClientList.length}</Text>
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

            {softSanctionClientLoading ? (
              <Text style={{textAlign: 'center', marginTop: 20}}>Loading clients...</Text>
            ) : softSanctionClientError ? (
              <Text style={{textAlign: 'center', color: 'red', marginTop: 20}}>{softSanctionClientError}</Text>
            ) : (
              <FlatList
                data={filteredLeads}
                renderItem={({item}) => (
                  <LeadCard
                    lead={item}
                    bankName={bankList.find(b => b.id.toString() === selectedBank)?.bank_name.trim() || ''}
                    productName={selectedProduct || ''}
                    methodName={selectedMethod || ''}
                  />
                )}
                keyExtractor={item => item.clientId}
                ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 20}}>No Clients Found</Text>}
              />
            )}
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
