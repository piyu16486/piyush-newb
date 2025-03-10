import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, ViewProps} from 'react-native';
import {Colors} from '@constants/index';

export const Container: React.FC<React.PropsWithChildren<ViewProps>> = ({
  children,
  ...props
}) => {
  const {style, ...rest} = props;
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      <StatusBar
        hidden={false}
        translucent={false}
        backgroundColor={Colors.lightGray}
        barStyle={'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: StatusBar.currentHeight,
  },
});
