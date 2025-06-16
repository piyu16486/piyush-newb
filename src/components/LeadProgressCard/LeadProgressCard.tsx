import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/Colors';

interface LeadProgressProps {
  clientId: string;
  clientName: string;
  location: string;
  initiator: string;
  sourceDHCO: string;
  referenceDetails: string;
  monthlyTurnover: string;
  sanctionRequested: string;
  processStart: string;
  status: 'Warm' | 'Hot' | 'Cold';
  onPressReadMore: (id: string) => void;
}

const ChipColors = {
  Warm: '#FFC107',
  Hot: '#FF5656',
  Cold: Colors.tertiaryBlue,
};

export const LeadProgressCard: React.FC<LeadProgressProps> = ({
  clientId,
  clientName,
  location,
  initiator,
  sourceDHCO,
  referenceDetails,
  monthlyTurnover,
  sanctionRequested,
  processStart,
  status,
  onPressReadMore,
}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.statusBadge, {backgroundColor: ChipColors[status]}]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      {[
        {label: 'Client Id', value: clientId},
        {label: 'Client Name', value: clientName},
        {label: 'Location', value: location},
        {
          label: 'Initiator',
          value: initiator,
        },
        {label: 'Source (D/H/C/O)', value: sourceDHCO},
        {
          label: 'Reference Details',
          value: referenceDetails,
        },
        {label: 'Monthly Turnover', value: monthlyTurnover},
        {label: 'Sanction Requested', value: sanctionRequested},
        {label: 'Process Start', value: processStart},
      ].map((item, index) => (
        <Text style={styles.text} key={index}>
          <Text style={styles.label}>{item.label}: </Text>
          {item.value}
        </Text>
      ))}
      {/* "Read More" Button */}
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => onPressReadMore(clientId)}>
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
