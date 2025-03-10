import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '@screens/index';
import React, {useEffect, useState} from 'react';
import {AuthNavigator} from './AuthNavigator';

export const MainNavigator = () => {
  const [isInitialized, setIsInitialized] = useState(false);

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
      <AuthNavigator />
    </NavigationContainer>
  );
};
