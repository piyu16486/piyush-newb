/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Container, CustomDropdown, DateNTimePicker} from '@components/index';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {scaleFont, scaleHeight} from '@utils/Scale';
import {Plus} from '@assets/Icons';
import fontWeight from '@constants/FontWeight';

const remarkData = [
  {
    id: '1',
    visitDate: '10-10-2024',
    visitorName: 'Pritesh Trivedi',
    taskType: 'Call',
    taskDescription: 'Discussed Product',
    remark: 'Client showed interest in premium packages.',
    status: 'Completed',
  },
  {
    id: '2',
    visitDate: '12-10-2024',
    visitorName: 'Hardik Patel',
    taskType: 'Email',
    taskDescription: 'Send Product Details',
    remark: 'Follow-up required next week for confirmation.',
    status: 'Completed',
  },
  {
    id: '3',
    visitDate: '12-10-2024',
    visitorName: 'Hardik Patel',
    taskType: 'Call',
    taskDescription: 'Send Product Details',
    remark: 'Follow-up required next week for confirmation.',
    status: 'Pending',
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return {color: 'green'};
    case 'pending':
      return {color: 'orange'};
    case 'cancelled':
      return {color: 'red'};
    default:
      return {color: '#333'};
  }
};

type ClientInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<ClientNavigatorType>
>;

export const ClientLeadInfoTab = () => {
  const [activeTab, setActiveTab] = useState<'Task' | 'Report'>('Task');
  const [schedule, setSchedule] = useState<Date | undefined>();

  return (
    <Container>
      <ScrollView style={styles.container}>
        {/* Lead Information Card */}
        <View style={styles.card}>
          {/* Status Badge */}
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>Warm</Text>
          </View>

          {/* Lead Details */}
          <Text style={styles.label}>Lead Information</Text>
          <Text style={styles.subLabel}>
            <Text style={styles.boldText}>Full Name :</Text> XYZ Company PVT.
            LTD.
          </Text>
          <Text style={styles.subLabel}>Follow Up :</Text>
          <View style={styles.separator} />

          <Text style={styles.label}>Owner</Text>
          <Text style={styles.subLabel}>Lorem Ipsum</Text>
          <View style={styles.separator} />

          <Text style={styles.label}>Assigned to</Text>
          <Text style={styles.subLabel}>Lorem Ipsum</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('Task')}
            style={[
              styles.tabButton,
              activeTab === 'Task' && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Task' && styles.activeTabText,
              ]}>
              Task Assignment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Report')}
            style={[
              styles.tabButton,
              activeTab === 'Report' && styles.activeTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Report' && styles.activeTabText,
              ]}>
              Remark Report
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'Task' ? (
          <View style={styles.formCard}>
            <Text style={styles.label}>Assign Task</Text>

            {/* Date and Time Input */}
            <DateNTimePicker
              label="Schedule"
              value={schedule ? schedule.toISOString() : undefined}
              onConfirm={setSchedule}
            />

            {/* Sales Person Name */}
            <CustomDropdown
              label="Sales Person Name"
              data={[
                {label: 'Sales Person 1', value: 'salesperson1'},
                {label: 'Sales Person 2', value: 'salesperson2'},
                {label: 'Sales Person 3', value: 'salesperson3'},
                {label: 'Sales Person 4', value: 'salesperson4'},
              ]}
              containerStyle={{marginTop: scaleHeight(14)}}
            />

            {/* Task Type */}
            <CustomDropdown
              label="Task Type"
              data={[
                {label: 'Task Type 1', value: 'tasktype1'},
                {label: 'Task Type 2', value: 'tasktype2'},
                {label: 'Task Type 3', value: 'tasktype3'},
                {label: 'Task Type 4', value: 'tasktype4'},
              ]}
              containerStyle={{marginTop: scaleHeight(14)}}
            />

            {/* Task */}
            <CustomDropdown
              label="Task"
              data={[
                {label: 'Task 1', value: 'task1'},
                {label: 'Task 2', value: 'task2'},
                {label: 'Task 3', value: 'task3'},
                {label: 'Task 4', value: 'task4'},
              ]}
              containerStyle={{marginTop: scaleHeight(14)}}
            />

            {/* Add More Task Button */}
            <TouchableOpacity style={styles.addTaskButton}>
              <Text style={styles.addTaskText}>Add more Task</Text>
              <Plus height={15} width={15} />
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity style={styles.assignButton}>
              <Text style={styles.assignButtonText}>Assign a Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginTop: 20}}>
            <Text style={[styles.label, {marginBottom: 12}]}>
              [Lead Name] Feedback & Remark Overview
            </Text>

            {remarkData.map(item => (
              <View key={item.id} style={styles.remarkCard}>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Visit Date:</Text>{' '}
                  {item.visitDate}
                </Text>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Visitor:</Text>{' '}
                  {item.visitorName}
                </Text>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Task Type:</Text>{' '}
                  {item.taskType}
                </Text>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Description:</Text>{' '}
                  {item.taskDescription}
                </Text>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Remark:</Text> {item.remark}
                </Text>
                <Text style={styles.remarkLabel}>
                  <Text style={styles.remarkTitle}>Status: </Text>
                  <Text
                    style={[styles.statusValue, getStatusColor(item.status)]}>
                    {item.status}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  header: {
    backgroundColor: '#fdeeee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e53935',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  badgeContainer: {
    backgroundColor: '#f4c542',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  badgeText: {fontWeight: 'bold', fontSize: 12, color: '#fff'},

  label: {fontWeight: 'bold', fontSize: 14, marginTop: 8},
  subLabel: {color: '#555', marginVertical: 2},
  boldText: {fontWeight: 'bold'},
  separator: {height: 1, backgroundColor: '#ddd', marginVertical: 8},

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 10,
  },
  tabButton: {flex: 1, padding: 12, alignItems: 'center'},
  tabText: {color: '#444', fontWeight: '600'},
  activeTab: {borderBottomWidth: 2, borderBottomColor: '#e53935'},
  activeTabText: {color: '#e53935'},

  formCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputLabel: {fontWeight: 'bold', marginTop: 12, marginBottom: 4},
  inputWithIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  input: {flex: 1, fontSize: 14, color: '#000'},

  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
  },
  addTaskText: {
    marginLeft: 6,
    fontWeight: fontWeight.SemiBold,
    fontSize: scaleFont(13),
    marginRight: scaleHeight(6),
  },
  assignButton: {
    backgroundColor: '#e53935',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: fontWeight.SemiBold,
  },
  remarkCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  remarkLabel: {
    marginVertical: 2,
    color: '#333',
    fontSize: 13,
  },
  remarkTitle: {
    fontWeight: fontWeight.SemiBold,
  },
  statusValue: {
    fontWeight: fontWeight.Medium,
  },
});
