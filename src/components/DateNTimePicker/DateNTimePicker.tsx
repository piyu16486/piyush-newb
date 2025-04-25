/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Calender} from '@assets/Icons/Calender';

interface DateTimePickerProps {
  mode: 'date' | 'time' | 'datetime'; // ⬅️ add 'datetime'
  label: string;
  onConfirm: (date: Date) => void;
  value?: Date;
}

export const DateNTimePicker: React.FC<DateTimePickerProps> = ({
  mode,
  label,
  onConfirm,
  value,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showPicker = () => setIsVisible(true);
  const hidePicker = () => setIsVisible(false);

  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleConfirm = (date: Date) => {
    if (mode === 'datetime') {
      setTempDate(date); // save date first
      setShowTimePicker(true); // show time picker next
    } else {
      onConfirm(date);
      hidePicker();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showPicker} style={styles.inputBox}>
        <View style={styles.inputRow}>
          <Text style={styles.inputText}>
            {value
              ? moment(value).format(
                  mode === 'date'
                    ? 'DD MMM YYYY'
                    : mode === 'time'
                    ? 'hh:mm A'
                    : 'DD MMM YYYY, hh:mm A',
                )
              : `Select ${mode}`}
          </Text>
          <Calender width={16} height={16} style={{marginLeft: 8}} />
        </View>
      </TouchableOpacity>

      {/* Main Picker (date/time/datetime) */}
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        date={value || new Date()}
      />

      {/* Time picker for datetime mode */}
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={time => {
          if (tempDate) {
            const combined = new Date(tempDate);
            combined.setHours(time.getHours());
            combined.setMinutes(time.getMinutes());
            onConfirm(combined);
          }
          setTempDate(null);
          setShowTimePicker(false);
          hidePicker();
        }}
        onCancel={() => {
          setShowTimePicker(false);
          setTempDate(null);
          hidePicker();
        }}
        date={value || new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputBox: {
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
});
