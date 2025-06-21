import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import Colors from '@constants/Colors';
import {RightChevron} from '@assets/Icons';

type FilterOption = {
  label: string;
  checked: boolean;
  isNested?: boolean;
  subOptions?: string[];
};

interface Props {
  visible: boolean;
  onClose: () => void;
  options: FilterOption[];
  onToggleOption: (index: number) => void;
}

export const FilterDropDown: React.FC<Props> = ({
  visible,
  onClose,
  options,
  onToggleOption,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              onPress={() => onToggleOption(index)}>
              <View style={styles.checkbox}>
                {option.checked && <View style={styles.checkedBox} />}
              </View>
              <Text style={styles.label}>{option.label}</Text>
              <RightChevron />
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    width: 220,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.balancedGray,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: Colors.green,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
});
