import {NavigationContainer} from '@react-navigation/native';
import {SplashScreen} from '@screens/index';
import React, {useEffect, useState} from 'react';
import {AuthNavigator} from './AuthNavigator';

export const MainNavigator = () => {
  const [isInitilised, setIsIntilised] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsIntilised(true);
      clearTimeout(splashTimer);
    }, 2000);
  }, []);

  if (!isInitilised) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
