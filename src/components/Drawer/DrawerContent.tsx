import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React from 'react';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import {UserImg} from '@assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LeftChevron, SalesPipeline, UpChevron} from '@assets/Icons';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Colors, Fonts} from '@constants/index';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {navigation} = props;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.rootView}>
      <SafeAreaView style={styles.container}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <SalesPipeline height={scaleHeight(24)} width={scaleWidth(24)} />
            <Text style={styles.buttonText}>Sales Pipeline</Text>
          </TouchableOpacity>

          <View style={{flex: 1}}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#E9EBE9'}]}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setIsOpen(!isOpen);
              }}>
              <View style={styles.rowCenter}>
                <SalesPipeline
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
                  <Text style={styles.buttonText}>Lead Management</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Lead Management</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  rootView: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
  container: {
    flex: 1,
  },
  rowCenter: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  headerContainer: {
    flex: 1,
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
    flex: 1,
    fontSize: scaleFont(18),
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.primaryColor,
  },
  subTitle: {
    flex: 1,
    fontSize: scaleFont(12),
    fontFamily: Fonts.GilroyMedium,
    color: '#95969C',
  },
  buttonContainer: {
    marginTop: scaleHeight(24),
    marginHorizontal: scaleWidth(16),
  },
  button: {
    flexDirection: 'row',
    flex: 1,
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
});
