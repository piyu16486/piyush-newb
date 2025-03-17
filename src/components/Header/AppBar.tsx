import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@constants/index';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {MenuIcon} from '@assets/Icons';

export type AppBarProps = {
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;

  renderLeftIcon?: React.ReactNode;
  onPressLeftIcon?: () => void;
  leftIconProps?: TouchableOpacityProps;
  leftIconContainerStyle?: StyleProp<ViewStyle>;

  navigation: any; // TODO add type
};

export const AppBar: React.FC<AppBarProps> = ({
  title = '',
  containerStyle,
  leftIconContainerStyle,
  onPressLeftIcon,
  renderLeftIcon,
  leftIconProps,
  titleTextStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          if (onPressLeftIcon) {
            onPressLeftIcon();
          } else {
            // openDrawer(); TODO add drawer function
          }
        }}
        style={[leftIconContainerStyle]}
        {...leftIconProps}>
        {renderLeftIcon ? (
          renderLeftIcon
        ) : (
          <MenuIcon height={scaleWidth(16)} width={scaleHeight(16)} />
        )}
      </TouchableOpacity>

      <Text style={[styles.titleText, titleTextStyle]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE9E9',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(10),
  },
  titleText: {
    color: Colors.primaryColor,
    fontFamily: Fonts.GilroyBold,
    fontSize: scaleFont(20),
    marginStart: scaleWidth(24),
  },
});
