import {Filter, Plus, Search} from '@assets/Icons';
import {AppBar, ClientCard, Container} from '@components/index';
import {ClientScreens, Colors, FontWeight} from '@constants/index';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientCardReadMore} from '@screens/ReadMore/ClientCardReadMore';
import {clientActions, clientSelector} from '@store/client';
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type NavigationType = CompositeScreenProps<
  NativeStackScreenProps<ClientNavigatorType>,
  DrawerScreenProps<HomeNavigatorType>
>;

type ClientInfoProps = {
  navigation: NavigationType['navigation'];
};

export const ClientInfo: React.FC<ClientInfoProps> = ({navigation}) => {
  const [showReadMore, setShowReadMore] = useState(false);

  const dispatch = useDispatch();
  const clientsData = useSelector(clientSelector.getClientList);

  const callGetClients = () => {
    dispatch(clientActions.getClients());
  };
  useEffect(() => {
    callGetClients();
  }, []);

  const onPressReadMore = useCallback(() => {
    setShowReadMore(prev => !prev);
  }, []);

  const onPressFAB = () => {
    navigation.navigate(ClientScreens.FormSelectionScreen);
  };

  const onPressCard = (id: number) => {
    navigation.navigate(ClientScreens.ClientLeadInfoTab, {clientId: id});
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View style={styles.subContainer}>
        <Text style={styles.Subheader}>Client Information</Text>
      </View>
      {showReadMore ? (
        <ClientCardReadMore onPressReadLess={onPressReadMore} />
      ) : (
        <>
          <View style={styles.RowContainer}>
            <View style={styles.subRowContainer}>
              <Text style={styles.subRowContainerTxt}>Clients</Text>
              <View style={styles.Badge}>
                <Text style={styles.badgeText}>{clientsData.length}</Text>
              </View>
            </View>
            <View style={styles.Searchbox}>
              <Search height={12} width={12} />
              <TextInput
                style={styles.input}
                placeholder="Search Leads"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.filterBox}>
              <View>
                <Filter height={12} width={12} />
              </View>
            </View>
          </View>
          <View style={styles.cardList}>
            <FlatList
              data={clientsData}
              renderItem={({item}) => (
                <ClientCard
                  data={item}
                  onPressReadMore={onPressReadMore}
                  onPressCard={onPressCard}
                />
              )}
              refreshing={false}
              onRefresh={callGetClients}
              ListEmptyComponent={
                <Text style={styles.emptyList}>No Clients Found</Text>
              }
            />
          </View>
          <TouchableOpacity style={styles.plusButton} onPress={onPressFAB}>
            <Plus height={24} width={24} />
          </TouchableOpacity>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: '#fff',
  },
  emptyList: {
    fontSize: scaleFont(16),
    fontWeight: FontWeight.SemiBold,
    color: Colors.SteelGray,
    textAlign: 'center',
  },
  Subheader: {
    width: '100%',
    padding: 16,
    fontSize: scaleFont(16),
    fontWeight: FontWeight.SemiBold,
    backgroundColor: Colors.LimeGray,
  },
  RowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  subRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subRowContainerTxt: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: Colors.darkblack,
  },
  Badge: {
    backgroundColor: Colors.lightPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: Colors.SteelGray,
  },
  Searchbox: {
    flex: 1,
    flexDirection: 'row',
    height: scaleHeight(29),
    marginLeft: 5,
    marginTop: 2,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EAECF0',
    borderWidth: 1,
    borderRadius: 3,
    gap: 16,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: scaleFont(12),
  },
  filterBox: {
    width: scaleWidth(32),
    height: scaleHeight(30),
    backgroundColor: Colors.primaryColor,
    marginLeft: scaleWidth(8),
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardList: {
    flex: 1,
    padding: 16,
  },
  plusButton: {
    position: 'absolute',
    bottom: scaleHeight(60),
    right: 30,
    backgroundColor: Colors.tertiaryBlue,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
