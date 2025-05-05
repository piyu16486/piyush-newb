import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {scaleFont} from '@utils/Scale';
import fontWeight from '@constants/FontWeight';
import Colors from '@constants/Colors';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

type FieldProps = {
  label: string;
  value?: string;
};

export const ClientCardReadMore = ({
  onPressReadLess,
}: {
  onPressReadLess: () => void;
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.status}>Warm</Text>
      </View>

      <Section title="Basic Details">
        <Field label="Client ID" value="0001" />
        <Field label="Source (D/H/C/O)" value="Source D" />
        <Field label="Location" value="Delhi" />
        <Field label="City" value="Delhi" />
        <Field label="State" value="Source D" />
        <Field label="Type of Visit" value="9899893222" />
        <Field label="Visit Number" value="20,00,000" />
        <Field label="Date of Visited" value="25,00,000" />
        <Field label="File By" value="10-02-2023" />
      </Section>

      <Section title="Client and Firm Details">
        <Field label="Name of Client" />
        <Field label="Firm Name" />
        <Field label="Contact Number" />
        <Field label="Type of Firm" />
        <Field label="Business Vintage" />
        <Field label="Business Vintage" />
        <Field label="Sector" />
        <Field label="Bank Name" />
        <Field label="CIBIL Score" />
        <Field label="Facility Type" />
        <Field label="Existing Funding Sanctioned Amt" />
        <Field label="Estimated Funding Required" />
        <Field label="Credit Period Offer" />
      </Section>

      <Section title="Vendor Details">
        <Field label="Product" />
        <Field label="Vendor Name" />
        <Field label="Vendor Contact Number" />
        <Field label="Vendor Contact Email" />
        <Field label="Monthly Sales Value" />
      </Section>

      <Section title="Visit Details">
        <Field label="Intent" />
        <Field label="Visit Remarks" />
        <Field label="Date of Next Visit" />
        <Field label="Reason for Not Interested" />
        <Field label="Are you interested for?" />
      </Section>
      <TouchableOpacity style={styles.readMoreButton} onPress={onPressReadLess}>
        <Text style={styles.readMoreText}>Read Less</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Section = ({title, children}: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Field = ({label, value = 'Value'}: FieldProps) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  statusContainer: {
    backgroundColor: Colors.Yellow,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 16,
  },
  status: {
    color: '#000',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: Colors.primaryColor,
    marginBottom: 10,
  },
  field: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: fontWeight.SemiBold,
    width: 180,
  },
  value: {
    flex: 1,
    color: Colors.graybase,
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
