import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/Colors';
import {Download} from '@assets/Icons';

type TurnoverMethodProps = {
  TurnoverMethod: {
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
};

export const TurnoverMethodCard: React.FC<TurnoverMethodProps> = ({
  TurnoverMethod,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.icon}>
        <Download width={14} height={14} />
      </TouchableOpacity>
      <Text style={styles.text}>
        <Text style={styles.label}>Monthly Turnover: </Text>
        {TurnoverMethod.monthlyTurnover}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Last 12 M Turnover: </Text>
        {TurnoverMethod.last12MTurnover}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Projected Turnover: </Text>
        {TurnoverMethod.projectedTurnover}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>CREDIT PERIOD Offered: </Text>
        {TurnoverMethod.creditPeriodOffered}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>20% of Projected TO :</Text>
        {TurnoverMethod.projectedTO}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Projected TO for credit period: </Text>
        {TurnoverMethod.projectedTOforCreditPeriod}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Existing W/C Limits: </Text>
        {TurnoverMethod.existingWCLimits}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Final Limit: </Text>
        {TurnoverMethod.finalLimit}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Actual Eligibility: </Text>
        {TurnoverMethod.actualEligibility}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Eligibility as per Tenor: </Text>
        {TurnoverMethod.eligibilityasperTenor}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.LimeGray,
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    borderColor: '#eee',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    color: '#555',
    marginBottom: 4,
  },
  button: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'red',
    fontWeight: '600',
  },
  icon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
});
