import {View, Text} from 'react-native';
import React from 'react';
import {Button} from '@components/index';
import {useDispatch, useSelector} from 'react-redux';
import {authActions, authSelector} from '@store/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const _user = useSelector(authSelector.getUserAllDetails);

  const handleLogin = () => {
    dispatch(
      authActions.loginRequest({username: 'emilys', password: 'emilyspass'}),
    );
  };

  const handleLogout = () => dispatch(authActions.logout());

  return (
    <View>
      {_user ? (
        <View>
          <Text>Logged in as: {JSON.stringify(_user, null, 2)}</Text>
          <Button buttonText="Logout " mode="outlined" onPress={handleLogout} />
        </View>
      ) : (
        <View>
          <Button buttonText="Login " mode="contained" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};
