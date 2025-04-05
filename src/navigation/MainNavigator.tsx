import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '@screens/index';
import React, {useEffect, useState} from 'react';
import {AuthNavigator} from './AuthNavigator';
import {useSelector} from 'react-redux';
import {userSelector} from '@store/user';
import {HomeNavigator} from './HomeNavigator';

export const MainNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const userInfo = useSelector(userSelector.getUserInfo);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsInitialized(true);
      clearTimeout(splashTimer);
    }, 2000);
  }, []);

  if (!isInitialized) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {!userInfo ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
