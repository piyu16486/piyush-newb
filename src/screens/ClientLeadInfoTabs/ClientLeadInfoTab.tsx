/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {AppBar, Container} from '@components/index';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ClientNavigatorType, HomeNavigatorType} from '@type/NavigatorTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import Colors from '@constants/Colors';

type ClientInfoNavigationType = CompositeNavigationProp<
  DrawerNavigationProp<HomeNavigatorType>,
  NativeStackNavigationProp<ClientNavigatorType>
>;

export const ClientLeadInfoTab = () => {
  const navigation = useNavigation<ClientInfoNavigationType>();

  const [activeTab, setActiveTab] = useState('task'); // 'task' or 'remark'
  const [salesPersonOpen, setSalesPersonOpen] = useState(false);
  const [taskTypeOpen, setTaskTypeOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const [salesPerson, setSalesPerson] = useState(null);
  const [taskType, setTaskType] = useState(null);
  const [task, setTask] = useState(null);
  const [date, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

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
  ];

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />

      <View style={styles.mainContainer}>
        <Text style={styles.tag}>Warm</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Lead Information</Text>
          <Text style={styles.text}>Full Name: XYZ Company PVT. LTD.</Text>
          <Text style={styles.text}>Follow Up :</Text>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Owner</Text>
          <Text style={styles.text}>Lorem Ipsum</Text>
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Assigned to</Text>
          <Text style={styles.text}>Lorem Ipsum</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <View style={styles.tabsWrapper}>
          <TouchableOpacity
            onPress={() => setActiveTab('task')}
            style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'task' && styles.activeTabText,
              ]}>
              Task Assignment
            </Text>
            {activeTab === 'task' && <View style={styles.redUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('remark')}
            style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'remark' && styles.activeTabText,
              ]}>
              Remark Report
            </Text>
            {activeTab === 'remark' && <View style={styles.redUnderline} />}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        {/* Tab Content */}
        {activeTab === 'task' ? (
          <View style={styles.section}>
            <Text style={styles.label}>Assign Task</Text>

            <TouchableOpacity
              onPress={() => setDatePickerOpen(true)}
              style={styles.inputBox}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={datePickerOpen}
              date={date}
              onConfirm={date => {
                setDatePickerOpen(false);
                setDate(date);
              }}
              onCancel={() => setDatePickerOpen(false)}
            />

            <DropDownPicker
              open={salesPersonOpen}
              value={salesPerson}
              items={[
                {label: 'John Doe', value: 'john'},
                {label: 'Jane Smith', value: 'jane'},
              ]}
              setOpen={setSalesPersonOpen}
              setValue={setSalesPerson}
              placeholder="Sales Person Name"
              style={styles.dropdown}
              zIndex={3000}
              zIndexInverse={1000}
            />

            <DropDownPicker
              open={taskTypeOpen}
              value={taskType}
              items={[
                {label: 'Follow Up', value: 'followup'},
                {label: 'Meeting', value: 'meeting'},
              ]}
              setOpen={setTaskTypeOpen}
              setValue={setTaskType}
              placeholder="Task Type"
              style={styles.dropdown}
              zIndex={2000}
              zIndexInverse={2000}
            />

            <DropDownPicker
              open={taskOpen}
              value={task}
              items={[
                {label: 'Call', value: 'call'},
                {label: 'Email', value: 'email'},
              ]}
              setOpen={setTaskOpen}
              setValue={setTask}
              placeholder="Task"
              style={styles.dropdown}
              zIndex={1000}
              zIndexInverse={3000}
            />

            <TouchableOpacity style={styles.addMoreButton}>
              <Text style={styles.addMoreText}>Add more Task +</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.assignButton}>
              <Text style={styles.assignButtonText}>Assign a Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={[styles.label, {marginBottom: 12}]}>
              [Lead Name] Feedback & Remark Overview
            </Text>

            <FlatList
              data={remarkData}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 20}}
              renderItem={({item}) => (
                <View style={styles.card}>
                  <Text style={styles.label}>
                    Visit Date:{' '}
                    <Text style={styles.text}>{item.visitDate}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Visitor Name:{' '}
                    <Text style={styles.text}>{item.visitorName}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Task Type: <Text style={styles.text}>{item.taskType}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Task Description:{' '}
                    <Text style={styles.text}>{item.taskDescription}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Remark: <Text style={styles.text}>{item.remark}</Text>
                  </Text>
                  <Text style={styles.label}>
                    Status:{' '}
                    <Text style={[styles.text, styles.completed]}>
                      {item.status}
                    </Text>
                  </Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
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
  mainContainer: {
    padding: 16,
    backgroundColor: Colors.LimeGray,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.black,
  },
  container: {
    // padding: 16,
    marginTop: scaleHeight(16),
    backgroundColor: Colors.LimeGray,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  completed: {
    color: Colors.green,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  tag: {
    backgroundColor: Colors.Yellow,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 4,
    fontWeight: '500',
    color: Colors.gray500,
  },
  text: {
    color: Colors.graybase,
  },

  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 18,
  },
  dropdown: {
    marginBottom: 40,
    zIndex: 10,
    height: 20,
  },
  addMoreButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  addMoreText: {
    color: 'blue',
  },
  assignButton: {
    backgroundColor: '#E30613',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  tabContainer: {
    alignItems: 'center',
    padding: 10,
    width: '100%',
    // backgroundColor: Colors.blueGray700,
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleWidth(60), // space between tabs
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: scaleFont(16),
    color: Colors.SteelGray,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  redUnderline: {
    height: 2,
    backgroundColor: Colors.primaryColor,
    width: '100%',
    marginTop: 4,
  },
});
