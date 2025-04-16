import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type LeadProps = {
  lead: {
    clientId: string;
    clientName: string;
    location: string;
    initiator: string;
    turnover: string;
    creditPeriod: string;
  };
};

export const LeadCard: React.FC<LeadProps> = ({lead}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        <Text style={styles.label}>Client ID :</Text> {lead.clientId}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Client Name :</Text> {lead.clientName}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Location :</Text> {lead.location}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Initiator :</Text> {lead.initiator}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Monthly Turnover :</Text> {lead.turnover}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Credit Period :</Text> {lead.creditPeriod}
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Run Soft Sanction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
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
});
