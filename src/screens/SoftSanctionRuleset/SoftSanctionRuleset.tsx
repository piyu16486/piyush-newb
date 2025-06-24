/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Container, AppBar, LeadCard} from '@components/index';
import {CompositeNavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont} from '@utils/Scale';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {FontWeight} from '@constants/index';
import {LeftChevronCircle} from '@assets/Icons';
import {SoftRulestCard} from '@components/SoftRulesetCard/SoftRulestCard';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import clientSelector from '@store/client/client.selector';
import { clientActions } from '@store/client';

type SoftInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<SoftNavigatorType>
>;

type Ruleset = {
  bankName: string;
  productName: string;
  methodName: string;
  rulesetId: string;
  ruleName: string;
  rulestCondition: string;
};

export const SoftSanctionRuleset = () => {
  const navigation = useNavigation<SoftInfoNavigationType>();
  const route = useRoute();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const rulesetData = useSelector(clientSelector.getSoftSanctionRuleset);
  const rulesetLoading = useSelector(clientSelector.getSoftSanctionRulesetLoading);
  const rulesetError = useSelector(clientSelector.getSoftSanctionRulesetError);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const { bankName, product } = route.params || {};
    if (bankName && product) {
      dispatch(clientActions.getSoftSanctionRuleset({ bank: bankName, product }));
    }
  }, [route.params]);

  const filteredRulesets = rulesetData.filter(item =>
    item.bank_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRefresh = () => {
    // @ts-ignore
    const { bankName, product } = route.params || {};
    setRefreshing(true);
    if (bankName && product) {
      dispatch(clientActions.getSoftSanctionRuleset({ bank: bankName, product }));
    }
    setTimeout(() => setRefreshing(false), 1000); // ensure spinner shows briefly
  };

  return (
    <Container>
      <AppBar title="Soft Sanction" navigation={navigation} />

      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Soft Sanction Ruleset</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.Content} onPress={navigation.goBack}>
          <LeftChevronCircle height={20} width={20} />
          <Text style={styles.contentText}>Rulesets</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{rulesetData.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {rulesetLoading ? (
          <Text>Loading...</Text>
        ) : rulesetError ? (
          <Text style={{ color: 'red' }}>{rulesetError}</Text>
        ) : (
          <FlatList
            data={filteredRulesets}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginBottom: 24, padding: 16, backgroundColor: '#fff', borderRadius: 8, elevation: 2}}>
                <Text style={{fontWeight: 'bold'}}>Bank Name: <Text style={{fontWeight: 'normal'}}>{item.bank_name}</Text></Text>
                <Text style={{fontWeight: 'bold'}}>Product Name: <Text style={{fontWeight: 'normal'}}>{item.product_name}</Text></Text>
                <Text style={{fontWeight: 'bold'}}>Method Name: <Text style={{fontWeight: 'normal'}}>{item.method_name}</Text></Text>
                <Text style={{fontWeight: 'bold', marginTop: 8}}>Rules:</Text>
                {item.rules && item.rules.length > 0 ? (
                  <FlatList
                    data={item.rules}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={({item: rule}) => (
                      <View style={{marginLeft: 8, marginBottom: 4}}>
                        <Text style={{fontWeight: '600'}}>{rule.label}</Text>
                        {rule.value !== null && (
                          <Text style={{color: '#555'}}>Value: {rule.value}</Text>
                        )}
                      </View>
                    )}
                  />
                ) : (
                  <Text style={{marginLeft: 8}}>No rules found.</Text>
                )}
              </View>
            )}
            contentContainerStyle={{paddingBottom: 20}}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </View>
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
  Content: {
    margin: 15,
    flexDirection: 'row',
    gap: 8,
  },
  contentText: {
    fontSize: scaleFont(16),
    fontWeight: FontWeight.SemiBold,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  headerRow: {
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
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  countText: {
    color: '#d6336c',
    fontWeight: 'bold',
  },
});
