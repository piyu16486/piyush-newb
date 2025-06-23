import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/Colors';
import {ILeadProgressResponseDatum} from '@store/client';

interface LeadProgressProps {
  // clientId: string;
  // clientName: string;
  // location: string;
  // initiator: string;
  // sourceDHCO: string;
  // referenceDetails: string;
  // monthlyTurnover: string;
  // sanctionRequested: string;
  // processStart: string;
  // status: 'Warm' | 'Hot' | 'Cold';
  data: ILeadProgressResponseDatum;
  onPressReadMore: (id: string, item: ILeadProgressResponseDatum) => void;
}

const ChipColors = {
  Warm: '#FFC107',
  Hot: '#FF5656',
  Cold: Colors.tertiaryBlue,
};

export const LeadProgressCard: React.FC<LeadProgressProps> = ({
  data,
  onPressReadMore,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.statusBadge, {backgroundColor: ChipColors.Warm}]}>
        <Text style={styles.statusText}>{'warm'}</Text>
      </View>

      {[
        {label: 'Client Id', value: data.id},
        {label: 'Client Name', value: data.client_name ?? 'N/A'},
        {label: 'Location', value: data.location},
        {
          label: 'Initiator',
          value: 'TODO: Initiator',
        },
        {label: 'Source (D/H/C/O)', value: data.source_of_lead},
        {
          label: 'Reference Details',
          value: 'TODO REF DETAIL',
        },
        {label: 'Monthly Turnover', value: data.monthly_turnover ?? 0},
        {label: 'Sanction Requested', value: data.estimated_funding_required},
        {label: 'Process Start', value: 'TODO Process start'},
      ].map((item, index) => (
        <Text style={styles.text} key={index}>
          <Text style={styles.label}>{item.label}: </Text>
          {item.value}
        </Text>
      ))}
      {/* "Read More" Button */}
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => onPressReadMore(data.id.toString(), data)}>
        <Text style={styles.readMoreText}>Read more</Text>
      </TouchableOpacity>
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
