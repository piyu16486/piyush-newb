import React, {forwardRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {Scale} from '@utils/Scale';
import {Colors, FontWeight} from '@constants/index';

export interface CustomButtonProps extends TouchableOpacityProps {
  buttonText: string;
  mode: 'contained' | 'outlined';
  buttonTextStyle?: StyleProp<TextStyle>;
}

export const Button = forwardRef<View, CustomButtonProps>((props, ref) => {
  const {
    buttonText,
    mode,
    buttonTextStyle,
    disabled,
    style,
    ...touchableProps
  } = props;
  return (
    <TouchableOpacity
      ref={ref}
      disabled={disabled}
      style={[
        styles.buttonStyle,
        mode === 'outlined' && styles.buttonOutline,
        style,
      ]}
      {...touchableProps}>
      <Text
        style={[
          styles.buttonTextStyle,
          mode === 'outlined' && styles.outlinedButtonText,
          buttonTextStyle,
        ]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Scale(12),
    borderWidth: Scale(2),
    borderRadius: Scale(4),
    borderColor: Colors.primaryColor,
  },
  buttonOutline: {
    backgroundColor: Colors.white,
  },
  buttonTextStyle: {
    color: Colors.white,
    fontFamily: 'Gilroy',
    fontWeight: FontWeight.SemiBold,
    fontSize: Scale(16),
    lineHeight: Scale(20),
  },
  outlinedButtonText: {
    color: Colors.primaryColor,
  },
});
