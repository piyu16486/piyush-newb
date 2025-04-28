/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {UserImg} from '@assets/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ClientMaster,
  LeftChevron,
  UpChevron,
  LeadManagment,
  Logout,
} from '@assets/Icons';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {Colors, Fonts} from '@constants/index';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [DisOpen, setDIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null); // State for selected item
  const {navigation} = props;
  const {top, bottom} = useSafeAreaInsets();

  const handlePress = (item: string) => {
    setSelectedItem(item); // Set the selected item
    // You can navigate or perform any other actions here based on the selected item
  };

  return (
    <View style={styles.rootView}>
      <View style={[styles.container, {marginTop: top, marginBottom: bottom}]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.rowCenter}>
            <Image source={UserImg} style={styles.image} resizeMode="contain" />
            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>
                User Name
              </Text>
              <Text style={styles.subTitle} numberOfLines={2}>
                User Email ID
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.closeDrawer()}>
            <LeftChevron height={scaleHeight(12)} width={scaleWidth(12)} />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#E9EBE9'}]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  setDIsOpen(!DisOpen);
                }}>
                <View style={styles.rowCenter}>
                  <ClientMaster
                    height={scaleHeight(24)}
                    width={scaleWidth(24)}
                  />
                  <Text style={styles.buttonText}>
                    Client Information Master
                  </Text>
                </View>
                <UpChevron rotation={DisOpen ? 0 : 180} />
              </TouchableOpacity>
              {DisOpen && (
                <View style={{marginLeft: scaleWidth(24)}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('ClientNavigator', {
                        screen: 'ClientInfo',
                      })
                    }>
                    <Text style={styles.buttonText}>Client Information</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('SoftNavigator', {
                        screen: 'Softsanction',
                      })
                    }>
                    <Text style={styles.buttonText}>Soft Sanction</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('LeadNavigator', {
                        screen: 'LeadProgress',
                      })
                    }>
                    <Text style={styles.buttonText}>Lead Progress</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('ReportNavigator', {
                        screen: 'Report',
                      })
                    }>
                    <Text style={styles.buttonText}>Report</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#E9EBE9'}]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                  setIsOpen(!isOpen);
                }}>
                <View style={styles.rowCenter}>
                  <LeadManagment
                    height={scaleHeight(24)}
                    width={scaleWidth(24)}
                  />
                  <Text style={styles.buttonText}>Lead Management</Text>
                </View>
                <UpChevron rotation={isOpen ? 0 : 180} />
              </TouchableOpacity>
              {isOpen && (
                <View style={{marginLeft: scaleWidth(24)}}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Recording of Lead</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Profiling of Lead</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Follow up Action</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('KycNavigator', {
                        screen: 'KycDocument',
                      })
                    }>
                    <Text style={styles.buttonText}>KYC Document</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('DocNavigator', {
                        screen: 'DocumentValidation',
                      })
                    }>
                    <Text style={styles.buttonText}>Document Validation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pre Screening</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Bank Fitment</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        {/* Logout Button*/}
        <View style={styles.logOut}>
          <View style={styles.row}>
            <Logout height={scaleHeight(24)} width={scaleWidth(24)} />
            <Text style={styles.buttonText}>Log Out</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('screen').height,
  },
  container: {
    flex: 1,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  rowCenter: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  headerContainer: {
    padding: scaleWidth(16),
    paddingBottom: scaleHeight(26),
    backgroundColor: '#FFE9E9',
    borderTopRightRadius: scaleWidth(8),
    borderBottomWidth: scaleWidth(2),
    borderColor: 'rgba(227, 6, 19, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: 'rgba(236, 74, 83, 0.3)',
    borderRadius: scaleWidth(32),
    height: scaleWidth(32),
    width: scaleWidth(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: scaleHeight(46),
    width: scaleWidth(46),
    borderRadius: scaleWidth(23),
  },
  infoContainer: {
    marginStart: scaleWidth(16),
    flex: 1,
  },
  title: {
    fontSize: scaleFont(18),
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.primaryColor,
  },
  subTitle: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.GilroyMedium,
    color: '#95969C',
  },
  buttonContainer: {
    flex: 1,
    marginTop: scaleHeight(24),
    marginHorizontal: scaleWidth(16),
  },
  button: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    padding: scaleWidth(8),
    marginBottom: scaleHeight(12),
    borderRadius: scaleWidth(4),
  },
  buttonText: {
    color: '#252C32',
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(16),
    marginStart: scaleWidth(16),
  },
  logOut: {
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
  },
});
