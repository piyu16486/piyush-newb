import {Button, Container, Header, Input, TnCFooter} from '@components/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthNavigatorType} from '@type/NavigatorTypes';
import {scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Country} from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SigninScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigatorType>>();

  const [signupMode, setSignupMode] = useState<'email' | 'mobile'>('email');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [country, setCountry] = useState<Country>({
    cca2: 'IN',
    currency: ['INR'],
    callingCode: ['91'],
    region: 'Asia',
    subregion: 'Southern Asia',
    flag: 'flag-in',
    name: 'India',
  });
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <Container>
      <Header
        title="Welcome back to CashnTech"
        subtitle="Log In to your account"
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: scaleWidth(43),
          marginTop: scaleHeight(36),
        }}>
        <Input
          label="Enter your Email Address"
          onChangeText={setContactInfo}
          value={contactInfo}
          keyboardType={signupMode === 'email' ? 'email-address' : 'number-pad'}
        />
        <Input
          label="Password"
          onChangeText={setPassword}
          value={password}
          containerStyle={{marginTop: scaleHeight(24)}}
        />
        <View>
          <View>
            <TouchableOpacity onPress={() => setRememberMe(pre => !pre)}>
              <Icon
                name={
                  rememberMe
                    ? 'checkbox-marked-outline'
                    : 'checkbox-blank-outline'
                }
              />
            </TouchableOpacity>
            <Text></Text>
          </View>
          <TouchableOpacity>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Button buttonText="Get Verification Code" />
      </View>
      <TnCFooter navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({});
