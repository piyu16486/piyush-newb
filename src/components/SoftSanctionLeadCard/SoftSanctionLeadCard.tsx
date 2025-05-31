import fontWeight from '@constants/FontWeight';
import {Colors} from '@constants/index';
import {scaleFont, scaleHeight} from '@utils/Scale';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

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
  const [showModal, setShowModal] = useState(false);
  const [purchaseValue, setPurchaseValue] = useState('');
  const [turnoverValue, setTurnoverValue] = useState('');

  const handleRun = () => {
    console.log('Soft sanction data:', {
      clientId: lead.clientId,
      purchaseValue,
      turnoverValue,
    });
    setShowModal(false);
  };

  return (
    <>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Run Soft Sanction</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Run Soft Sanction</Text>
            <Text style={styles.modalSubtitle}>
              Rulesets (1) for Turnover method (SBI, DF)
            </Text>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Purchases</Text>
              <Text style={styles.modalSubLabel}>
                Last 12 M Purchases of brand 1 (GSTMar24)
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter value"
                keyboardType="numeric"
                value={purchaseValue}
                onChangeText={setPurchaseValue}
              />
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalLabel}>Turnover</Text>
              <Text style={styles.modalSubLabel}>Existing W/C Limits</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter value"
                keyboardType="numeric"
                value={turnoverValue}
                onChangeText={setTurnoverValue}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
                <Text style={styles.runText}>Run</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    marginTop: scaleHeight(12),
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: Colors.primaryColor,
    fontWeight: fontWeight.SemiBold,
    fontSize: scaleFont(16),
  },
  // Modal styles
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 16,
  },
  modalLabel: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
  },
  modalSubLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelText: {
    marginRight: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  runBtn: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  runText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// marginTop: 12,
//     borderWidth: 1,
//     borderColor: 'red',
//     paddingVertical: 8,
//     borderRadius: 6,
//     alignItems: 'center',
