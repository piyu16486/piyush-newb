import {Upload} from '@assets/Icons';
import Colors from '@constants/Colors';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type UploadButtonProps = {
  label: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export const DashedButton: React.FC<UploadButtonProps> = ({
  label,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <View style={styles.buttonContent}>
        <Upload width={18} height={13} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // make button horizontal
    alignItems: 'center', // vertically center content
    alignSelf: 'flex-start', // align button to the left
    borderWidth: 2, // thicker dashed border
    borderColor: '#B0B0B0', // new border color
    borderStyle: 'dashed',
    borderRadius: 8, // slightly rounder corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.LimeGray, // fallback if Colors.LimeGray is not defined
    marginTop: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: Colors.graybase,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});
