import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {forwardRef} from 'react';
import Fonts from '@constants/Fonts';
import {Scale} from '@utils/Scale';
import {Colors} from '@constants/index';

export interface InputProps extends TextInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  renderRightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
  rightIconStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    label,
    labelStyle,
    containerStyle,
    renderRightIcon,
    onPressRightIcon,
    rightIconStyle,
    style,
    ...rest
  } = props;
  return (
    <View style={containerStyle}>
      {label && label.length > 0 && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={[styles.inputContainer]}>
        <TextInput ref={ref} {...rest} style={[styles.inputStyle, style]} />
        {renderRightIcon && (
          <TouchableOpacity
            style={[styles.rightContainerStyle, rightIconStyle]}
            onPress={() => {
              onPressRightIcon?.();
            }}>
            {renderRightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.GilroyMedium,
    fontSize: Scale(14),
    color: Colors.gray,
    marginBottom: Scale(12),
  },
  inputContainer: {
    borderWidth: Scale(1.5),
    borderRadius: Scale(4),
    borderColor: Colors.gray300,
    paddingHorizontal: Scale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    color: Colors.darkGray,
    fontFamily: Fonts.GilroyMedium,
    fontSize: Scale(14),
    flex: 1,
  },
  rightContainerStyle: {
    marginEnd: Scale(12),
    padding: Scale(4),
  },
});
