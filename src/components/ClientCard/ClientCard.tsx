import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '@constants/index';
import {IClientInfoResponseDatum} from '@store/client';
import {Dots} from '@assets/Icons';
import {scaleHeight, scaleWidth} from '@utils/Scale';

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
  edit: 'Edit',
  delete: 'Delete',
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
  onEdit?: (id: number) => void; // Optional edit handler
  onDelete?: (id: number) => void; // Optional delete handler
};

export const ClientCard: React.FC<ClientCardProps> = ({
  data,
  onPressReadMore,
  onPressCard,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleOptionPress = (option: 'edit' | 'delete') => {
    setMenuVisible(false);
    if (option === 'edit' && onEdit) onEdit(data.id);
    if (option === 'delete' && onDelete) onDelete(data.id);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.threeDotsButton}
        onPress={toggleMenu}
        activeOpacity={0.7}>
        <Dots height={scaleHeight(32)} width={scaleWidth(36)} />
      </TouchableOpacity>
      {/* Dropdown menu */}
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity onPress={() => handleOptionPress('edit')}>
            <Text style={styles.menuText}>{Strings.edit}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionPress('delete')}>
            <Text style={styles.menuText}>{Strings.delete}</Text>
          </TouchableOpacity>
        </View>
      )}

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
  threeDotsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Just below the three dots button
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 20,
  },
  menuText: {
    paddingVertical: 6,
    fontSize: 14,
    color: '#333',
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
