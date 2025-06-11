/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
// KYCFormSelection
// KycScreen.tsx
import {Filter, RightCheckmark, RightChevron, Search} from '@assets/Icons';
import {Calender} from '@assets/Icons/Calender';
import {
  AppBar,
  Container,
  CustomDropdown,
  Input,
  DateNTimePicker,
} from '@components/index';
import {TaskCard} from '@components/TaskCard/TaskCard';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import FontWeight from '@constants/FontWeight';
import fontWeight from '@constants/FontWeight';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {clientActions, clientSelector} from '@store/client';
import {HomeNavigatorType, DocNavigatorType} from '@type/NavigatorTypes';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const TaskData = [
  {
    tasktype: 'Call',
    taskDescription: 'Discussed Product',
    clientId: '0001',
    clientName: 'S D Verma',
    location: 'Delhi',
    referenceDetails: '9898923222',
    sourceDHCO: 'Source D',
    status: 'Warm',
    historyStatus: 'Completed',
  },
  {
    tasktype: 'Call',
    taskDescription: 'Discussed Product',
    clientId: '0002',
    clientName: 'S D Verma',
    location: 'Delhi',
    referenceDetails: '9898923222',
    sourceDHCO: 'Source D',
    status: 'Hot',
    historyStatus: 'Pending',
  },
  {
    tasktype: 'Call',
    taskDescription: 'Discussed Product',
    clientId: '0003',
    clientName: 'S D Verma',
    location: 'Delhi',
    referenceDetails: '9898923222',
    sourceDHCO: 'Source D',
    status: 'Cold',
    historyStatus: 'Completed',
  },
  {
    tasktype: 'Call',
    taskDescription: 'Discussed Product',
    clientId: '0004',
    clientName: 'S D Verma',
    location: 'Delhi',
    referenceDetails: '9898923222',
    sourceDHCO: 'Source D',
    status: 'Warm',
    historyStatus: 'Completed',
  },
];

export const TaskLogTabs = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'update' | 'history'>(
    'tasks',
  );

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [schedule, setSchedule] = useState<Date | undefined>();
  const dispatch = useDispatch();
  const TaskHitoryData = useSelector(clientSelector.getTaskHistory);
  const callgetTaskhistory = () => {
    dispatch(clientActions.getTaskHistory());
  };
  useEffect(() => {
    callgetTaskhistory();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <View>
            <View style={styles.RowContainer}>
              <View style={styles.Subrowcontainer}>
                <Text style={styles.Subrowcontainertxt}>Task</Text>
                <View style={styles.Badge}>
                  <Text style={styles.Badgetext}>{TaskHitoryData.length}</Text>
                </View>
              </View>
            </View>
            <View style={styles.Cardlist}>
              <FlatList
                data={TaskHitoryData}
                keyExtractor={item => item.clientId}
                renderItem={({item}) => <TaskCard {...item} />}
                contentContainerStyle={{flexGrow: 1}}
                onRefresh={callgetTaskhistory}
                ListEmptyComponent={
                  <Text style={styles.emptyList}>No Task Found</Text>
                }
                refreshing={false}
              />
            </View>
          </View>
        );
      case 'update':
        return (
          <View>
            <Text style={styles.heading}>Submit Task Update</Text>

            <DateNTimePicker
              mode="datetime"
              label="Schedule"
              value={schedule}
              onConfirm={setSchedule}
            />

            <CustomDropdown
              label="Sales Person Name "
              data={[
                {label: 'Salesman 1', value: 'Salesman1'},
                {label: 'Salesman 2', value: 'Salesman2'},
                {label: 'Salesman 3', value: 'Salesman3'},
                {label: 'Salesman 4', value: 'Salesman4'},
                {label: 'Salesman 5', value: 'Salesman5'},
              ]}
              containerStyle={{marginTop: scaleHeight(20)}}
            />

            <CustomDropdown
              label="Task Type"
              data={[
                {label: 'Task 1', value: 'task1'},
                {label: 'Task 2', value: 'task2'},
                {label: 'Task 3', value: 'task3'},
                {label: 'Task 4', value: 'task4'},
                {label: 'Task 5', value: 'task5'},
              ]}
              placeholder="call"
              containerStyle={{marginTop: scaleHeight(20)}}
            />

            <Input
              label="Task"
              placeholder="Discussed Product"
              containerStyle={{marginTop: scaleHeight(20)}}
            />

            <CustomDropdown
              label="Status"
              data={[
                {label: 'Status 1', value: 'status1'},
                {label: 'Status 2', value: 'status2'},
                {label: 'Status 3', value: 'status3'},
                {label: 'Status 4', value: 'status4'},
                {label: 'Status 5', value: 'status5'},
              ]}
              placeholder="Completed"
              containerStyle={{marginTop: scaleHeight(20)}}
            />

            <Input
              label="Remark"
              placeholder="Value"
              containerStyle={{marginTop: scaleHeight(20)}}
            />

            <View style={styles.footerButton}>
              {/* Clear All Button */}
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => console.log('Clear All Pressed')}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
              {/* Save Button */}
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.saveButton}
                  activeOpacity={0.7}
                  onPress={() => console.log('Next Pressed')}>
                  <Text style={styles.saveText}>Submit</Text>
                  <RightCheckmark width={12} height={12} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 'history':
        return (
          <View>
            <View style={styles.RowContainer}>
              <View style={styles.Subrowcontainer}>
                <Text style={styles.Subrowcontainertxt}>Task History</Text>
                <View style={styles.Badge}>
                  <Text style={styles.Badgetext}>{TaskHitoryData.length}</Text>
                </View>
              </View>
            </View>
            <View style={styles.Cardlist}>
              <FlatList
                data={TaskHitoryData}
                keyExtractor={item => item.clientId}
                renderItem={({item}) => (
                  <TaskCard
                    {...item}
                    historyStatus={
                      item.historyStatus as 'Completed' | 'Pending'
                    }
                    showHistoryStatus={true}
                  />
                )}
                contentContainerStyle={{flexGrow: 1}}
                onRefresh={callgetTaskhistory}
                ListEmptyComponent={
                  <Text style={styles.emptyList}>No Task History Found</Text>
                }
                refreshing={false}
              />
            </View>
          </View>
        );
    }
  };

  return (
    <Container>
      <AppBar title="Task Log" />

      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabRow}>
          {['Tasks', 'Update', 'History'].map((label, index) => {
            const key = label.toLowerCase().split(' ')[0] as
              | 'tasks'
              | 'update'
              | 'history';
            return (
              <TouchableOpacity
                key={label}
                onPress={() => setActiveTab(key)}
                style={styles.tab}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === key && styles.activeTabText,
                  ]}>
                  {label}
                </Text>
                {activeTab === key && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyList: {
    fontSize: scaleFont(16),
    fontWeight: FontWeight.SemiBold,
    color: Colors.SteelGray,
    textAlign: 'center',
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
  RowContainer: {
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
  Cardlist: {
    flex: 1,
    // padding: 16,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primaryColor,
    fontWeight: fontWeight.SemiBold,
  },
  activeIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: Colors.primaryColor,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    marginBottom: 24,
    color: Colors.graybase,
  },
  subHeading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  cardText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  clearButton: {},
  clearText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(5),
    borderRadius: scaleWidth(4),
    gap: scaleWidth(8),
    borderWidth: 1,
    borderColor: Colors.green,
    minWidth: scaleWidth(100),
  },
  saveText: {
    color: Colors.white,
    fontFamily: Fonts.GilroyMedium,
    fontSize: scaleFont(14),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
});
