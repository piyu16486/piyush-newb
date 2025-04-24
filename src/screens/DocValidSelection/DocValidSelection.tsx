import {RightChevron} from '@assets/Icons';
import {AppBar, Container} from '@components/index';
import Colors from '@constants/Colors';
import fontWeight from '@constants/FontWeight';
import {scaleFont} from '@utils/Scale';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type ItemProps = {
  title: 'Personal KYC Validation' | 'Business KYC Validation' | 'Reports';
};

const Data: ItemProps[] = [
  {title: 'Personal KYC Validation'},
  {title: 'Business KYC Validation'},
  {title: 'Reports'},
];

export const DocValidSelection = () => {
  return (
    <Container>
      <AppBar title="Document Validation" />

      {/* List Section */}
      <View style={styles.container}>
        {Data.map(item => (
          <TouchableOpacity key={item.title} style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
            <RightChevron height={17} width={20} />
          </TouchableOpacity>
        ))}
      </View>
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
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 16,
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1, // Added border
    borderColor: '#CBCED5', // Border color as requested
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray500,
  },
});
