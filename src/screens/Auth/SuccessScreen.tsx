import React, {useEffect, useMemo} from 'react';
import {Container, Header} from '@components/index';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '@constants/index';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import LottieView from 'lottie-react-native';
import {successLottie} from '@assets/Lottie';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {userActions} from '@store/user';

export const SuccessScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const {params} = useRoute<RouteProp<AuthNavigatorType, 'SuccessScreen'>>();
  const dispatch = useDispatch();

  const message = useMemo(() => {
    switch (params.authMode) {
      case 'signin':
        return `Welcome back,${''} \nYou are now signed in.`;
      case 'signup':
        return `Welcome aboard,${''} \nYour account is now created.`;
      case 'password':
        return 'Your password has been updated.';
    }
  }, [params.authMode]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    const timer = setTimeout(() => {
      if (params.authMode === 'signin' || params.authMode === 'signup') {
        dispatch(userActions.setUserInfo('token'));
      } else {
        navigation.goBack();
      }
      clearTimeout(timer);
    }, 2500);

    return () => backHandler.remove();
  }, [params.authMode, navigation, dispatch]);

  return (
    <Container>
      <View style={styles.flex1}>
        <Header title={message} />
        <LottieView
          source={successLottie}
          autoPlay
          loop={false}
          style={styles.checkMark}
        />
      </View>
      <Text style={styles.copyRightText}>
        Copyright 2024, CashnTech Pvt Ltd., All Rights Reserved
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  copyRightText: {
    textAlign: 'center',
    color: Colors.gray200,
    fontFamily: Fonts.GilroyMedium,
    margin: scaleHeight(4),
    fontSize: scaleFont(10),
  },
  checkMark: {
    height: scaleWidth(100),
    width: scaleWidth(100),
    alignSelf: 'center',
    marginTop: scaleHeight(55),
  },
});
