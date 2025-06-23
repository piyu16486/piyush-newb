import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {RightChevron} from '@assets/Icons';
import Colors from '@constants/Colors';

type FilterOption = {
  label: string;
  checked: boolean;
  isNested?: boolean;
  subOptions?: string[];
};

interface Props {
  options: FilterOption[];
  onToggleOption: (index: number) => void;
}

export const FilterDropDown: React.FC<Props> = ({options, onToggleOption}) => {
  const formattedOptions = options.map((item, index) => ({
    label: item.label,
    value: index.toString(),
  }));

  return (
    <View style={styles.wrapper}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={formattedOptions}
        labelField="label"
        valueField="value"
        placeholder="Filter"
        onChange={item => {
          const index = parseInt(item.value, 10);
          onToggleOption(index);
        }}
        renderItem={(item: any) => {
          const isChecked = options[parseInt(item.value, 10)].checked;
          return (
            <View style={styles.item}>
              <View style={styles.checkbox}>
                {isChecked && <View style={styles.checkedBox} />}
              </View>
              <Text style={styles.label}>{item.label}</Text>
              <RightChevron />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 10,
    marginTop: 10,
    zIndex: 999,
  },
  dropdown: {
    height: 40,
    width: 140,
    borderColor: Colors.balancedGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  dropdownContainer: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.balancedGray,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 10,
    height: 10,
    backgroundColor: Colors.green,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: Colors.black,
  },
});
