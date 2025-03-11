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
import {Scale} from '@utils/Scale';
import {UserImg} from '@assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LeftChevron, SalesPipeline, UpChevron} from '@assets/Icons';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Colors} from '@constants/index';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {navigation} = props;
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingStart: 0,
        paddingEnd: 0,
      }}>
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
            <LeftChevron height={Scale(12)} width={Scale(16)} />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <SalesPipeline height={Scale(24)} width={Scale(24)} />
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
                <SalesPipeline height={Scale(24)} width={Scale(24)} />
                <Text style={styles.buttonText}>Lead Management</Text>
              </View>
              <UpChevron rotation={isOpen ? 0 : 180} />
            </TouchableOpacity>
            {isOpen && (
              <View style={{marginLeft: Scale(24)}}>
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
  container: {
    flex: 1,
  },
  rowCenter: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  headerContainer: {
    flex: 1,
    padding: Scale(16),
    paddingBottom: Scale(26),
    backgroundColor: '#FFE9E9',
    borderTopRightRadius: Scale(8),
    borderBottomWidth: Scale(2),
    borderColor: 'rgba(227, 6, 19, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: 'rgba(236, 74, 83, 0.3)',
    borderRadius: Scale(26),
    height: Scale(32),
    width: Scale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Scale(46),
    width: Scale(46),
    borderRadius: Scale(23),
  },
  infoContainer: {
    marginStart: Scale(16),
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: Scale(18),
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.primaryColor,
  },
  subTitle: {
    flex: 1,
    fontSize: Scale(12),
    fontFamily: 'Gilroy-Medium',
    color: '#95969C',
  },
  buttonContainer: {marginTop: Scale(24), marginHorizontal: Scale(16)},
  button: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: Scale(8),
    marginBottom: Scale(12),
    borderRadius: Scale(4),
  },
  buttonText: {
    color: '#252C32',
    fontFamily: 'Gilroy-Medium',
    fontSize: Scale(16),
    marginStart: Scale(16),
  },
});
