/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {AppBar, Container, RulesetTCPDCard} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight} from '@utils/Scale';
import {LeftChevronCircle} from '@assets/Icons';
import FontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import { RulesetViewCard } from '@components/RulesetTCPDCard/RulesetViewCard';

type SoftInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<SoftNavigatorType>
>;

type RulesetViewArr = {
  basis: string;
  creditPeriod: string;
  methodName: string;
  tpaAmount: string;
  finallimit: string;
  
};

export const RulesetView = () => {
  const navigation = useNavigation<SoftInfoNavigationType>();
  const route = useRoute();
  // @ts-ignore
  const { rulesetData } = route.params || {};
  const [search, setSearch] = useState<string>('');

  const staticLeads: RulesetViewArr[] = [
    {
      basis: 'Sales',
      creditPeriod: '30',
      methodName: 'Turnover Method',
      tpaAmount: '20,00,000',
      finallimit: '50,00,000',
    },
    {
      basis: 'Brand Purchase',
      creditPeriod: '20',
      methodName: 'Purchase Method',
      tpaAmount: '30,00,000',
      finallimit: '60,00,000',
    },
    {
      basis: 'Stock and Debitor',
      creditPeriod: '50',
      methodName: 'WC Method',
      tpaAmount: '90,00,000',
      finallimit: '100,00,000',
    },
  ];

  // If rulesetData is provided, map it to the expected format
  const leads = Array.isArray(rulesetData)
    ? rulesetData.map(item => ({
        methodName: item.method,
        basis: item.basis,
        creditPeriod: String(item.credit_period),
        finallimit: String(item.final_limit),
        tpaAmount: item.tpaAmount || '', // fallback if not present
      }))
    : staticLeads;

  const filteredLeads = leads.filter(lead =>
    lead.basis.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <AppBar title="Soft Sanction" navigation={navigation} />

      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>SoftSanction View</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.Content} onPress={navigation.goBack}>
          <LeftChevronCircle height={20} width={20} />
          <Text style={styles.contentText}>Bank Name, Product Name</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>XYZ Company PVT. LTD</Text>
        <Text style={styles.bodyText}>Ahmedabad, Gujarat</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredLeads}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('UGROTurnoverMethod')}>
              <RulesetViewCard
                RulesetView={{
                  ...item,
                  creditperiod: item.creditPeriod,
                  tpwAmount: item.tpaAmount,
                }}
              />
            </TouchableOpacity>
          )}
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
  subHeading: {
    padding: 16,
  },
  subHeadingText: {
    fontSize: scaleFont(14),
    fontWeight: fontWeight.SemiBold,
    marginBottom: scaleHeight(12),
    color: Colors.gray500,
  },
  bodyText: {
    fontSize: scaleFont(12),
    fontWeight: fontWeight.Medium,
    color: Colors.gray300,
  },
});
