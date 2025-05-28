import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '@constants/index';
import {IClientInfoResponseDatum} from '@store/client';

const Strings = {
  clientId: 'Client ID :',
  clientName: 'Client Name :',
  location: 'Location :',
  initiator: 'Initiator :',
  sourceDHCO: 'Source (D/H/C/O) :',
  referenceDetails: 'Reference Details :',
  monthlyTurnover: 'Monthly Turnover :',
  sanctionRequested: 'Sanction Requested :',
  financier: 'Financier :',
  readMore: 'Read more',
};

const ChipColors = {
  Warm: '#FFC107',
  Hot: '#FF5656',
  Cold: Colors.tertiaryBlue,
};

type ClientCardProps = {
  data: IClientInfoResponseDatum;
  onPressReadMore: (id: number) => void;
  onPressCard: (id: number) => void;
};

/**
 * A card component for displaying client info.
 *
 * @param {IClientInfoResponseDatum} data - Client data
 * @param {Function} onPressReadMore - Function to call when "Read more" is pressed
 * @param {Function} onPressCard - Function to call when the card is pressed
 * @returns {JSX.Element} Client card component
 */
export const ClientCard: React.FC<ClientCardProps> = ({
  data,
  onPressReadMore,
  onPressCard,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => onPressCard(data.id)}
        activeOpacity={0.7}>
        <View style={[styles.statusBadge, {backgroundColor: ChipColors.Warm}]}>
          <Text style={styles.statusText}>{'Warm'}</Text>
        </View>

        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.clientId}</Text> {data.id}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.clientName}</Text>
          {data.client_name}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.location}</Text> {data.location}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.initiator}</Text>
          {'TODO: Initiator'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.sourceDHCO}</Text>
          {data.source_of_lead}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.referenceDetails}</Text>
          {'TODO: Reference Details'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.monthlyTurnover}</Text>
          {'TODO: Monthly Turnover'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.sanctionRequested}</Text>
          {data.estimated_funding_required}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>{Strings.financier}</Text>
          {'TODO: Financier'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => onPressReadMore(data.id)}>
        <Text style={styles.readMoreText}>{Strings.readMore}</Text>
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
