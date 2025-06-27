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
  const { rulesetData, location, clientName } = (route.params || {}) as {
    rulesetData?: any[];
    location?: string;
    clientName?: string;
  };
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
    ? rulesetData
        .slice(1) // skip the first object (meta info)
        .map(item => ({
          methodName: item.method,
          basis: item.basis,
          creditPeriod: String(item.credit_period),
          finallimit: String(item.final_limit),
          tpaAmount: item.tpaAmount || '', // fallback if not present
        }))
    : staticLeads;

  const filteredLeads = leads.filter(lead =>
    typeof lead.basis === 'string' && lead.basis.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate minimum final_limit from filteredLeads
  const minFinalLimit = filteredLeads.length > 0
    ? Math.min(
        ...filteredLeads.map(lead => {
          // Remove commas and parse as number
          const num = Number(String(lead.finallimit).replace(/,/g, ''));
          return isNaN(num) ? Infinity : num;
        })
      )
    : 0;

  // Format as Indian currency string
  const formattedMinFinalLimit = minFinalLimit > 0
    ? minFinalLimit.toLocaleString('en-IN')
    : '-';

  // Footer component for FlatList
  const ListFooter = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Final Eligibility : <Text style={styles.footerAmount}>{formattedMinFinalLimit}</Text>
      </Text>
    </View>
  );

  // Get bank name and product from first object in rulesetData if available
  const metaInfo = Array.isArray(rulesetData) && rulesetData.length > 0 ? rulesetData[0] : {};
  const displayBankName = metaInfo.bank_name || 'Bank Name';
  const displayProductName = metaInfo.product || 'Product Name';

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
          <Text style={styles.contentText}>
            {displayBankName}
            {displayProductName ? `  Product[${displayProductName}]` : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subHeading}>
        <Text style={styles.subHeadingText}>Client Name: {clientName}</Text>
        <Text style={styles.subHeadingText}>Location: {location}</Text>
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
          ListFooterComponent={ListFooter}
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
  footerContainer: {
    paddingVertical: 8,
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    backgroundColor: '#c7c7c7',
    paddingLeft: 20,
    marginLeft: 8,
  },
  footerText: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: Colors.gray500,
    paddingLeft: 4,
  },
  footerAmount: {
    color: Colors.gray500,
    fontWeight: fontWeight.Bold,
    fontSize: scaleFont(16),
  },
});
