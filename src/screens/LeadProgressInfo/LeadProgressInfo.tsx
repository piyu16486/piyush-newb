import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {ILeadProgressResponseDatum} from '@store/client';
import {scaleFont, scaleHeight} from '@utils/Scale';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface StatusItem {
  status: string;
  date: string;
  remark: string;
  tat: string;
}

export const LeadProgressInfo = ({
  onPressReadLess,
  data,
  progressStatusData,
}: {
  onPressReadLess: () => void;
  data: ILeadProgressResponseDatum | null;
  progressStatusData: Array<any>;
}) => {
  // const progressStatusData = [
  //   {
  //     id: '1',
  //     status: 'Login',
  //     date: '10-10-2025',
  //     remark: 'Completed',
  //     tat: '3',
  //   },
  //   {
  //     id: '2',
  //     status: 'Credit Assessment',
  //     date: '10-10-2025',
  //     remark: 'Completed',
  //     tat: '3',
  //   },
  //   {
  //     id: '3',
  //     status: 'PSD and Digital Links',
  //     date: '10-10-2025',
  //     remark: 'Reason for Late',
  //     tat: '3',
  //   },
  // ];

  const renderStatusItem = ({item}: {item: any}) => (
    <View style={styles.statusBlock}>
      <Text style={styles.label}>
        <Text style={styles.bold}>Status :</Text> {item.status}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Date :</Text> {item.date}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>Remark :</Text> {item.remark}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.bold}>TAT :</Text> {item.tat}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>Warm</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Basic Details</Text>
        {/* All Basic Details */}
        <Text style={styles.label}>
          <Text style={styles.bold}>Client ID :</Text> {data?.id}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Client Name :</Text> {data?.client_name}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Location :</Text> {data?.location}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Initiator :</Text> {data?.location}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Source (D/H/C/O) :</Text>
          {data?.source_of_lead}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Reference Details :</Text> TODO REF
          9889823222
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Monthly Turnover :</Text>
          {data?.monthly_turnover}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Sanction Requested :</Text>
          {data?.estimated_funding_required}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Process Start :</Text> 10-02-2023
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Lead Progress Status</Text>
        {/* Wrapping FlatList inside a View */}
        <View>
          <FlatList
            data={progressStatusData}
            renderItem={renderStatusItem}
            keyExtractor={item => item.id}
            scrollEnabled={false} // required inside ScrollView
          />
        </View>
      </View>
      {/* "Read More" Button */}
      <TouchableOpacity style={styles.readMoreButton} onPress={onPressReadLess}>
        <Text style={styles.readMoreText}>Read Less</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.LimeGray,
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
  scrollContainer: {
    marginTop: scaleHeight(10),
    padding: 16,
    backgroundColor: Colors.LimeGray,
    paddingBottom: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#FFC107',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    marginBottom: 10,
  },
  tagText: {
    // fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c00',
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  statusBlock: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  readMoreButton: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
  readMoreText: {
    color: Colors.tertiaryBlue,
    textDecorationLine: 'underline',
    fontWeight: fontWeight.SemiBold,
  },
});
