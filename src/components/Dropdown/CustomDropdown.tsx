import Colors from '@constants/Colors';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

// Default dummy data if none is passed
const dummyData = [
  {label: 'A', value: 'A'},
  {label: 'B', value: 'B'},
  {label: 'C', value: 'C'},
  {label: 'C', value: 'C'},
  {label: 'E', value: 'E'},
];

type Props = {
  label: string;
  data?: Array<{label: string; value: string}>;
  value?: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CustomDropdown = ({
  label,
  data = dummyData,
  value: selectedValue = null,
  placeholder = 'Choose one',
  onChange,
  containerStyle,
}: Props) => {
  const [value, setValue] = useState<string | null>(selectedValue);

  const handleChange = (item: {label: string; value: string}) => {
    setValue(item.value);
    onChange?.(item.value);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 16,
    marginBottom: scaleHeight(4),
  },
  label: {
    fontSize: scaleFont(14),
    marginBottom: 8,
    color: '#333',
  },
  dropdown: {
    borderWidth: scaleWidth(1.5),
    borderColor: Colors.gray300,
    borderRadius: scaleWidth(4),
    paddingHorizontal: scaleWidth(6),
    height: scaleHeight(36),
    justifyContent: 'center',
  },
  placeholderStyle: {
    fontSize: scaleFont(14),
    color: Colors.gray300,
  },
  selectedTextStyle: {
    fontSize: scaleFont(14),
    color: Colors.darkGray,
  },
  itemTextStyle: {
    fontSize: scaleFont(16),
    color: '#333',
  },
});
