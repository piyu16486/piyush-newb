import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Container, Header, TnCFooter} from '@components/index';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import Fonts from '@constants/Fonts';
import {Colors} from '@constants/index';
import {scaleFont, scaleHeight} from '@utils/Scale';
import {useDispatch} from 'react-redux';
import {userActions} from '@store/user';

export const OnBoarding = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();
  const [showNewUser, setShowNewUser] = React.useState(false);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      const handler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (showNewUser) {
          setShowNewUser(false);
          return true;
        }
        return false;
      });
      return () => handler.remove();
    }, [showNewUser]),
  );

  const navigateToSignup = (userType: 'client' | 'internal') => {
    dispatch(userActions.setUserType(userType));
    navigation.navigate('SignupScreen');
  };

  return (
    <Container>
      <View style={styles.flex1}>
        <Header
          title="Welcome to CashnTech"
          customSubtitle={
            showNewUser ? (
              <View style={{marginTop: scaleHeight(8)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subTitle}>{'Choose your '}</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.subTitleLink}
                      onPress={() => navigateToSignup('client')}>
                      Client?
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.subTitle}>{' or '}</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.subTitleLink}
                      onPress={() => navigateToSignup('internal')}>
                      Internal?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text
                  style={
                    styles.subTitle
                  }>{`account type to continue your journey!`}</Text>
              </View>
            ) : (
              <View style={{marginTop: scaleHeight(8)}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subTitle}>{'Join Us if you are a '}</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.subTitleLink}
                      onPress={() => setShowNewUser(true)}>
                      new user?
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.subTitle}>{' or'}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={
                      styles.subTitle
                    }>{`Continue your Journey as an `}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SigninScreen')}>
                    <Text style={styles.subTitleLink}>{'existing user?'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        />
      </View>
      <TnCFooter navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  subTitle: {
    fontFamily: Fonts.GilroySemiBold,
    color: Colors.lightGray,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(22),
  },
  subTitleLink: {
    fontFamily: Fonts.GilroySemiBold,
    color: Colors.tertiaryColor,
    fontSize: scaleFont(14),
    textDecorationLine: 'underline',
    lineHeight: scaleFont(22),
  },
});
