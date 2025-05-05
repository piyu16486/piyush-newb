/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '@constants/index';
import {useNavigation} from '@react-navigation/native';

interface ClientCardProps {
  id: string;
  name: string;
  location: string;
  initiator: string;
  source: string;
  referenceDetails: string;
  monthlyTurnover: string;
  sanctionRequested: string;
  financier: string;
  status: 'Warm' | 'Hot' | 'Cold';
  onPressReadMore: (id: string) => void;
}

const ChipColors = {
  Warm: '#FFC107',
  Hot: '#FF5656',
  Cold: Colors.tertiaryBlue,
};

export const ClientCard: React.FC<ClientCardProps> = ({
  id,
  name,
  location,
  initiator,
  source,
  referenceDetails,
  monthlyTurnover,
  sanctionRequested,
  financier,
  status,
  onPressReadMore,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={[styles.statusBadge, {backgroundColor: ChipColors[status]}]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <Text style={styles.label}>
        <Text style={styles.bold}>Client ID :</Text> {id}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Client Name :</Text> {name}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Location :</Text> {location}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Initiator :</Text> {initiator}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Source (D/H/C/O) :</Text> {source}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Reference Details :</Text> {referenceDetails}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Monthly Turnover :</Text> {monthlyTurnover}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Sanction Requested :</Text>{' '}
        {sanctionRequested}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Financier :</Text> {financier}
      </Text>
      {/* "Read More" Button */}
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => onPressReadMore(id)}>
        <Text style={styles.readMoreText}>Read more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: '#515151',
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  readMoreButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  readMoreText: {
    color: Colors.tertiaryBlue,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
