/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Calender} from '@assets/Icons/Calender';

interface DateTimePickerProps {
  mode: 'date' | 'time' | 'datetime' | 'date_time_separate'; // added 'date_time_separate'
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
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDateSeparate, setShowDateSeparate] = useState(false);
  const [showTimeSeparate, setShowTimeSeparate] = useState(false);

  const showPicker = () => setIsVisible(true);
  const hidePicker = () => setIsVisible(false);

  const handleConfirm = (date: Date) => {
    if (mode === 'datetime') {
      setTempDate(date);
      setShowTimePicker(true);
    } else {
      onConfirm(date);
      hidePicker();
    }
  };

  const handleSeparateDateConfirm = (date: Date) => {
    const newDate = new Date(value || new Date());
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    onConfirm(newDate);
    setShowDateSeparate(false);
  };

  const handleSeparateTimeConfirm = (time: Date) => {
    const newDate = new Date(value || new Date());
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    onConfirm(newDate);
    setShowTimeSeparate(false);
  };

  const formattedDate = value
    ? moment(value).format('DD MMM YYYY')
    : 'Select Date';
  const formattedTime = value ? moment(value).format('hh:mm A') : 'Select Time';
  const formattedFull =
    value && mode === 'datetime'
      ? moment(value).format('DD MMM YYYY, hh:mm A')
      : value
      ? moment(value).format(
          mode === 'date' ? 'DD MMM YYYY' : mode === 'time' ? 'hh:mm A' : '',
        )
      : `Select ${mode}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {mode === 'date_time_separate' ? (
        <>
          {/* Separate Date Field */}
          <TouchableOpacity
            onPress={() => setShowDateSeparate(true)}
            style={styles.inputBox}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>{formattedDate}</Text>
              <Calender width={16} height={16} style={{marginLeft: 8}} />
            </View>
          </TouchableOpacity>

          {/* Separate Time Field */}
          <TouchableOpacity
            onPress={() => setShowTimeSeparate(true)}
            style={[styles.inputBox, {marginTop: 10}]}>
            <View style={styles.inputRow}>
              <Text style={styles.inputText}>{formattedTime}</Text>
              <Calender width={16} height={16} style={{marginLeft: 8}} />
            </View>
          </TouchableOpacity>
        </>
      ) : (
        // Original single field
        <TouchableOpacity onPress={showPicker} style={styles.inputBox}>
          <View style={styles.inputRow}>
            <Text style={styles.inputText}>{formattedFull}</Text>
            <Calender width={16} height={16} style={{marginLeft: 8}} />
          </View>
        </TouchableOpacity>
      )}

      {/* Picker for mode: 'date' | 'time' | 'datetime' */}
      <DateTimePickerModal
        isVisible={isVisible && mode !== 'date_time_separate'}
        mode={mode === 'date_time_separate' ? 'date' : mode}
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

      {/* Separate pickers for 'date_time_separate' mode */}
      <DateTimePickerModal
        isVisible={showDateSeparate}
        mode="date"
        onConfirm={handleSeparateDateConfirm}
        onCancel={() => setShowDateSeparate(false)}
        date={value || new Date()}
      />

      <DateTimePickerModal
        isVisible={showTimeSeparate}
        mode="time"
        onConfirm={handleSeparateTimeConfirm}
        onCancel={() => setShowTimeSeparate(false)}
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
