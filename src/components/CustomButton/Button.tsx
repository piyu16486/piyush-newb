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
import {scaleFont, scaleWidth} from '@utils/Scale';
import {Colors, Fonts} from '@constants/index';

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
    padding: scaleWidth(12),
    borderWidth: 2,
    borderRadius: scaleWidth(4),
    borderColor: Colors.primaryColor,
  },
  buttonOutline: {
    backgroundColor: Colors.white,
  },
  buttonTextStyle: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(20),
  },
  outlinedButtonText: {
    color: Colors.primaryColor,
  },
});
