/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {LeftChevronCircle} from '@assets/Icons';
import {Container, AppBar} from '@components/index';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {scaleFont} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import {Colors, FontWeight} from '@constants/index';
import {TurnoverMethodCard} from '@components/UGRO-TurnoverMethod/TurnoverMethodCard';

type SoftInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<SoftNavigatorType>
>;

type TurnoverMethod = {
  monthlyTurnover: string;
  last12MTurnover: string;
  projectedTurnover: string;
  creditPeriodOffered: string;
  projectedTO: string;
  projectedTOforCreditPeriod: string;
  existingWCLimits: string;
  finalLimit: string;
  actualEligibility: string;
  eligibilityasperTenor: string;
};

export const UGROTurnoverMethod = () => {
  const navigation = useNavigation<SoftInfoNavigationType>();
  const [search] = useState<string>('');

  const leads: TurnoverMethod[] = [
    {
      monthlyTurnover: '40,00,000',
      last12MTurnover: '4,80,00,000',
      projectedTurnover: '5,76,00,000',
      creditPeriodOffered: '45',
      projectedTO: '1,15,20,000',
      projectedTOforCreditPeriod: '71,01,370',
      existingWCLimits: '21,00,000',
      finalLimit: '50,00,000',
      actualEligibility: '94,20,000',
      eligibilityasperTenor: '50,01,370',
    },
  ];

  const filteredLeads = leads.filter(lead =>
    lead.monthlyTurnover.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />

      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Soft Sanction</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.Content} onPress={navigation.goBack}>
          <LeftChevronCircle height={20} width={20} />
          <Text style={styles.contentText}>
            UGRO - Turnover Method for {'\n'}XYZ Company PVT. LTD
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredLeads}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <TurnoverMethodCard TurnoverMethod={item} />}
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
});
