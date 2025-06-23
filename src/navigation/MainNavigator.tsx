import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '@screens/index';
import React, {useEffect, useState} from 'react';
import {AuthNavigator} from './AuthNavigator';
import {HomeNavigator} from './HomeNavigator';
import {useLoggedInCheck} from '@hooks/index';

export const MainNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const isLoggedIn = useLoggedInCheck();

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
    prefixes: ['cashntech://', 'https://cashntech.nikhilmakwana.in'],
    config: {
      screens: {
        PasswordScreen: {
          path: 'reset-password',
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {/*{isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}*/}
      {isLoggedIn ? <HomeNavigator /> : <HomeNavigator />}
    </NavigationContainer>
  );
};
