import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  BusinessKYCValidation,
  ClientCardReadMore,
  ClientInfo,
  ClientLeadInfoTab,
  CompanyDocument,
  CompanyPanCard,
  DocumentValidation,
  DocValidForm,
  DocValidSelection,
  FormSelectionScreen,
  GodownDetails,
  GodownDetails2,
  GSTDocument,
  InputFormField,
  KycDocument,
  KycElectricityBill,
  KYCFormSelection,
  KycOwner,
  KycUplaodPan,
  KycUploadAdhar,
  KycUploadDoc,
  LeadProgress,
  LeadProgressInfo,
  PersonalKYCValidation,
  Report,
  ResidenceDetail,
  RulesetTCPD,
  ShareholdingCompany,
  SoftsanctionProcess,
  SoftSanctionRuleset,
  UdhyamCertificate,
  TaskLogTabs,
  UGROPurchaseMethod,
  UGROTurnoverMethod,
} from '@screens/index';
import {ClientNavigatorType} from '@type/NavigatorTypes';

const Stack = createNativeStackNavigator<ClientNavigatorType>();

export const ClientNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ClientInfo" component={ClientInfo} />
      <Stack.Screen
        name="FormSelectionScreen"
        component={FormSelectionScreen}
      />
      <Stack.Screen name="InputFormField" component={InputFormField} />
      <Stack.Screen name="ClientLeadInfoTab" component={ClientLeadInfoTab} />
      <Stack.Screen name="ClientCardReadMore" component={ClientCardReadMore} />
      <Stack.Screen
        name="SoftsanctionProcess"
        component={SoftsanctionProcess}
      />
      <Stack.Screen
        name="SoftSanctionRuleset"
        component={SoftSanctionRuleset}
      />
      <Stack.Screen name="RulesetTCPD" component={RulesetTCPD} />
      <Stack.Screen name="UGROTurnoverMethod" component={UGROTurnoverMethod} />
      <Stack.Screen name="UGROPurchaseMethod" component={UGROPurchaseMethod} />
      <Stack.Screen name="LeadProgressInfo" component={LeadProgressInfo} />
      <Stack.Screen name="LeadProgress" component={LeadProgress} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="KycUploadDoc" component={KycUploadDoc} />
      <Stack.Screen name="KycUploadPan" component={KycUplaodPan} />
      <Stack.Screen name="KycUploadAdhar" component={KycUploadAdhar} />
      <Stack.Screen name="ResidenceDetail" component={ResidenceDetail} />
      <Stack.Screen name="KycElectricityBill" component={KycElectricityBill} />
      <Stack.Screen name="KycOwner" component={KycOwner} />
      <Stack.Screen name="UdhyamCertificate" component={UdhyamCertificate} />
      <Stack.Screen name="GSTDocument" component={GSTDocument} />
      <Stack.Screen name="GodownDetails" component={GodownDetails} />
      <Stack.Screen name="KycDocument" component={KycDocument} />
      <Stack.Screen name="KYCFormSelection" component={KYCFormSelection} />
      <Stack.Screen name="GodownDetails2" component={GodownDetails2} />
      <Stack.Screen name="CompanyPanCard" component={CompanyPanCard} />
      <Stack.Screen
        name="ShareholdingCompany"
        component={ShareholdingCompany}
      />
      <Stack.Screen name="CompanyDocument" component={CompanyDocument} />
      <Stack.Screen name="DocumentValidation" component={DocumentValidation} />
      <Stack.Screen name="DocValidForm" component={DocValidForm} />
      <Stack.Screen name="DocValidSelection" component={DocValidSelection} />
      <Stack.Screen
        name="PersonalKYCValidation"
        component={PersonalKYCValidation}
      />
      <Stack.Screen
        name="BusinessKYCValidation"
        component={BusinessKYCValidation}
      />
      <Stack.Screen name="TaskLogTabs" component={TaskLogTabs} />
    </Stack.Navigator>
  );
};
