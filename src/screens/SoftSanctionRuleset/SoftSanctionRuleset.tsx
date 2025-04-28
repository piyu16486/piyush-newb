/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Container, AppBar, LeadCard} from '@components/index';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont} from '@utils/Scale';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {FontWeight} from '@constants/index';
import {LeftChevronCircle} from '@assets/Icons';
import {SoftRulestCard} from '@components/SoftRulesetCard/SoftRulestCard';

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
  const [search, setSearch] = useState<string>('');

  const leads: Ruleset[] = [
    {
      bankName: 'Urgo',
      productName: 'PID',
      methodName: 'Turnover Method',
      rulesetId: 'UGPDTM001',
      ruleName: 'Rule Name',
      rulestCondition: 'Rule Condition',
    },
    {
      bankName: 'Urgo',
      productName: 'PID',
      methodName: 'Turnover Method',
      rulesetId: 'UGPDTM001',
      ruleName: 'Rule Name',
      rulestCondition: 'Rule Condition',
    },
    {
      bankName: 'Urgo',
      productName: 'PID',
      methodName: 'Turnover Method',
      rulesetId: 'UGPDTM001',
      ruleName: 'Rule Name',
      rulestCondition: 'Rule Condition',
    },
    {
      bankName: 'Urgo',
      productName: 'PID',
      methodName: 'Turnover Method',
      rulesetId: 'UGPDTM001',
      ruleName: 'Rule Name',
      rulestCondition: 'Rule Condition',
    },
  ];

  const filteredLeads = leads.filter(lead =>
    lead.bankName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />

      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Soft Sanction Ruleset</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.Content} onPress={navigation.goBack}>
          <LeftChevronCircle height={20} width={20} />
          <Text style={styles.contentText}>Rulesets</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{leads.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredLeads}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <SoftRulestCard Ruleset={item} />}
          contentContainerStyle={{paddingBottom: 20}}
        />
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
