/* eslint-disable @typescript-eslint/no-unused-vars */
import {LeftChevronCircle, RightCheckmark} from '@assets/Icons';
import {RightChevronCircle} from '@assets/Icons/RightChevronCircle';
import {
  AppBar,
  Container,
  CustomDropdown,
  DateNTimePicker,
  Input,
} from '@components/index';
import Colors from '@constants/Colors';
import Fonts from '@constants/Fonts';
import fontWeight from '@constants/FontWeight';
import {scaleFont, scaleHeight, scaleWidth} from '@utils/Scale';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  CreateClientFormProps,
  DataFieldsType,
  dropDownData,
  FieldType,
  formInputDetails,
  formNames,
  formTitles,
  FormTypes,
} from './CreateClientForm.type';
import {useDispatch, useSelector} from 'react-redux';
import {clientActions, ClientFormType, clientSelector} from '@store/client';

const CurrentForm = ({currentFormKey}: {currentFormKey: FormTypes}) => {
  const formData: ClientFormType = useSelector(
    clientSelector.getClientFormData,
  );
  const dispatch = useDispatch();
  const inputDetails = formInputDetails[currentFormKey];
  return inputDetails.map((item, index) => (
    <FormInput
      key={index}
      item={item}
      // @ts-expect-error: name is correctly typed per currentFormKey in ClientFormType
      value={formData[currentFormKey][item.name]}
      onUpdate={value => {
        dispatch(
          // @ts-expect-error: name is correctly typed per currentFormKey in ClientFormType
          clientActions.setClientFormData({
            formName: currentFormKey,
            name: item.name,
            value,
          }),
        );
      }}
    />
  ));
};

const FormInput = ({
  item,
  value,
  onUpdate,
}: {
  item: DataFieldsType;
  value: string;
  onUpdate: (value: string) => void;
}) => {
  if (item.type === FieldType.INPUT) {
    return (
      <Input
        label={item.label}
        placeholder="Value"
        value={value}
        onChangeText={onUpdate}
      />
    );
  }
  if (item.type === FieldType.DROPDOWN) {
    return (
      <CustomDropdown
        label={item.label}
        data={dropDownData[item.name]}
        value={value}
        onChange={onUpdate}
      />
    );
  }
  if (item.type === FieldType.DATE) {
    return (
      <DateNTimePicker
        label={item.label}
        onConfirm={date => {
          onUpdate(date.toDateString());
        }}
        value={value}
        placeholder="Select Date"
        datePickerProps={{
          date: new Date(),
          mode: 'date',
        }}
      />
    );
  }
  return null;
};

export const CreateClientForm: React.FC<CreateClientFormProps> = ({
  navigation,
  route: {params},
}) => {
  const dispatch = useDispatch();
  const [formIndex, setFormIndex] = React.useState(() =>
    formNames.indexOf(params.screen),
  );
  const currentFormKey: FormTypes = formNames[formIndex];
  const currentTitle = formTitles[currentFormKey];
  const onPressSaveNext = () => {
    const currentForm = formNames[formIndex];

    if (currentForm === 'BasicDetails') {
      dispatch(clientActions.saveClientBasicDetails());
    } else if (currentForm === 'ClientFirmScreen') {
      dispatch(clientActions.saveClientFirmDetails());
    } else if (currentForm === 'VendorScreen') {
      dispatch(clientActions.saveVendorDetails());
    } else if (currentForm === 'VisitScreen') {
      dispatch(clientActions.saveVisitDetails());
    }

    if (formIndex < formNames.length - 1) {
      setFormIndex(prev => prev + 1);
    }
  };

  const onPressClearAll = () => {
    dispatch(clientActions.resetClientFormData(currentFormKey));
  };

  return (
    <Container>
      <AppBar title="Client Information Master" navigation={navigation} />
      <View>
        <TouchableOpacity
          style={styles.subContainer}
          onPress={navigation.goBack}>
          <LeftChevronCircle height={26} width={26} />
          <Text style={styles.subheader}>{currentTitle}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <CurrentForm currentFormKey={currentFormKey} />
        </View>
      </ScrollView>
      <View style={styles.footerButton}>
        <TouchableOpacity style={styles.clearButton} onPress={onPressClearAll}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, {backgroundColor: Colors.white}]}
          activeOpacity={0.7}
          onPress={() => console.log('Save Pressed')}>
          <Text style={[styles.saveText, {color: Colors.green}]}>Save</Text>
        </TouchableOpacity>
        {formIndex === formNames.length - 1 ? (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              // Navigate to ClientInfo screen
              navigation.replace('ClientInfo');
            }}>
            <Text style={styles.saveText}>Submit</Text>
            <RightCheckmark width={12} height={12} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={onPressSaveNext}>
            <Text style={styles.nextText}>Next</Text>
            <View style={styles.iconWrapper}>
              <RightChevronCircle width={24} height={24} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LimeGray,
    paddingLeft: 16,
    paddingVertical: 12,
  },
  subheader: {
    marginLeft: 12,
    fontSize: scaleFont(16),
    fontWeight: fontWeight.SemiBold,
    color: '#333',
  },
  inputContainer: {
    marginHorizontal: scaleWidth(24),
    marginTop: scaleHeight(17),
    gap: scaleHeight(20),
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  clearButton: {
    paddingHorizontal: 10,
  },
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
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: Colors.blueGray700,
    fontSize: 16,
    marginStart: scaleWidth(10),
  },
  iconWrapper: {
    backgroundColor: '#EAEAEA',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginHorizontal: scaleWidth(12),
  },
  vendorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.graybase,
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginTop: scaleHeight(10),
    gap: 8,
  },
  vendorButtonText: {
    color: '#6E6E78',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});
