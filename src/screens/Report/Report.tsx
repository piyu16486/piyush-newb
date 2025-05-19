import {Filter, Search} from '@assets/Icons';
import {AppBar, Container} from '@components/index';
import Colors from '@constants/Colors';
import FontWeight from '@constants/FontWeight';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {clientActions, clientSelector} from '@store/client';
import {HomeNavigatorType, ReportNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

type ReportNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<ReportNavigatorType>
>;

export const Report = () => {
  const navigation = useNavigation<ReportNavigationType>();
  const dispatch = useDispatch();
  const reportData = useSelector(clientSelector.getRemarkReport);
  const callGetReport = () => {
    dispatch(clientActions.getReport());
  };
  useEffect(() => {
    callGetReport();
  }, []);

  const taskData = [
    {
      id: '1',
      leadName: 'Bhavya Shah',
      visitDate: '10-10-2024',
      visitorName: 'Pritesh Shah',
      taskType: 'Call',
      taskDescription: 'Discussed product,\nscheduled a demo',
      remark: 'Client showed interest in premium packages.',
      status: 'Complete',
    },
    {
      id: '2',
      leadName: 'Bhavya Shah',
      visitDate: '10-10-2024',
      visitorName: 'Pritesh Shah',
      taskType: 'Call',
      taskDescription: 'Discussed product,\nscheduled a demo',
      remark: 'Client showed interest in premium packages.',
      status: 'Complete',
    },
    {
      id: '3',
      leadName: 'Bhavya Shah',
      visitDate: '10-10-2024',
      visitorName: 'Pritesh Shah',
      taskType: 'Call',
      taskDescription: 'Discussed product,\nscheduled a demo',
      remark: 'Client showed interest in premium packages.',
      status: 'Complete',
    },
    // Add more items as needed
  ];

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>

      <Text style={styles.label}>
        <Text style={styles.bold}>Lead Name :</Text> {item.leadName}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Visit Date :</Text> {item.visitDate}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Visitor Name :</Text> {item.visitorName}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Task Type :</Text> {item.taskType}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Task Description :</Text>
        {'\n'}
        {item.taskDescription}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Remark :</Text>
        {'\n'}
        {item.remark}
      </Text>
    </View>
  );

  return (
    <Container>
      <AppBar title="Report" navigation={navigation} />
      {/* Content */}
      <View style={styles.Subcontainer}>
        <Text style={styles.Subheader}>Report</Text>
      </View>
      <View style={styles.RowContainer}>
        <View style={styles.Subrowcontainer}>
          <Text style={styles.Subrowcontainertxt}>Leads</Text>
          <View style={styles.Badge}>
            <Text style={styles.Badgetext}>{reportData.length}</Text>
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
        <View style={styles.Filterbox}>
          <View>
            <Filter height={12} width={12} />
          </View>
        </View>
      </View>
      <FlatList
        data={reportData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No Reports Found</Text>
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  Subcontainer: {
    backgroundColor: '#fff',
  },
  Subheader: {
    width: '100%', // ✅ Ensures full width
    padding: 16,
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    backgroundColor: Colors.LimeGray,
  },
  emptyList: {
    fontSize: scaleFont(16),
    fontWeight: FontWeight.SemiBold,
    color: Colors.SteelGray,
    textAlign: 'center',
  },
  RowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // ✅ Ensures proper wrapping if needed
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  Subrowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Subrowcontainertxt: {
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
  Badgetext: {
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
    paddingHorizontal: 10,
  },
  input: {
    marginLeft: 8,
    fontSize: scaleFont(12),
  },
  Filterbox: {
    width: scaleWidth(32),
    height: scaleHeight(30),
    backgroundColor: Colors.primaryColor,
    marginLeft: scaleWidth(8),
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.LimeGray,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderColor: '#eee',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  statusBadge: {
    backgroundColor: '#28a745',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 10,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    fontSize: scaleFont(14),
    marginBottom: 4,
    color: Colors.gray300,
  },
  bold: {
    fontWeight: fontWeight.SemiBold,
    color: Colors.graybase,
  },
});
