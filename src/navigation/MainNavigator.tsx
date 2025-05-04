import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '@screens/index';
import React, {useEffect, useState} from 'react';
import {AuthNavigator} from './AuthNavigator';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/user';
import {HomeNavigator} from './HomeNavigator';

export const MainNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const userInfo = null;

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsInitialized(true);
      clearTimeout(splashTimer);
    }, 2000);
  }, []);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        PasswordScreen: {
          path: 'reset-password',
          parse: {
            token: (token: string) => token,
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {!userInfo ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
