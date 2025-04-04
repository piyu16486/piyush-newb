import {LeftChevronCircle} from '@assets/Icons';
import {RightChevronCircle} from '@assets/Icons/RightChevronCircle';
import {AppBar, Container, Input} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function InputFormField() {
  const navigation =
    useNavigation<DrawerNavigationProp<HomeNavigatorType, 'ClientInfo'>>();

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      {/* Subheader Section */}
      <View>
        <TouchableOpacity
          style={styles.subcontainer}
          onPress={navigation.goBack}>
          <LeftChevronCircle height={26} width={26} />
          <Text style={styles.subheader}>Basic Details</Text>
        </TouchableOpacity>
      </View>
      {/*Form Content*/}
      <ScrollView>
        <View style={styles.inputContainer}>
          <Input label="Source of Lead" />
          <Input
            label="Location"
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input label="City" containerStyle={{marginTop: scaleHeight(20)}} />
          <Input label="State" containerStyle={{marginTop: scaleHeight(20)}} />
          <Input
            label="Type of Visit"
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input
            label="Visit Number"
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input
            label="Date of Visit"
            containerStyle={{marginTop: scaleHeight(20)}}
          />
          <Input
            label="File By"
            containerStyle={{marginTop: scaleHeight(20)}}
          />
        </View>
        <View style={styles.footerButton}>
          {/* Clear All Button */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => console.log('Clear All Pressed')}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
          {/* Save Button */}
          <Pressable
            style={({pressed}) => [
              styles.saveButton,
              pressed && styles.pressed,
            ]}
            onPress={() => console.log('Save Pressed')}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => console.log('Next Pressed')}>
            <Text style={styles.nextText}>Next</Text>
            <View style={styles.iconWrapper}>
              <RightChevronCircle width={18} height={18} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LimeGray,
    paddingLeft: 16, // Spacing from the left
    paddingVertical: 12,
  },
  subheader: {
    marginLeft: 12, // Space between icon and text
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: '#333',
  },
  inputContainer: {
    marginHorizontal: scaleWidth(24),
    marginTop: scaleHeight(17),
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  clearButton: {
    paddingHorizontal: 10,
  },
  clearText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  saveButton: {
    borderWidth: 2,
    borderColor: 'green',
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  saveText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: Colors.blueGray700,
    fontSize: 16,
    marginRight: 12,
  },
  iconWrapper: {
    backgroundColor: '#EAEAEA',
    borderRadius: 50,
    padding: 8,
  },
});
