import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ClientCardReadMore,
  ClientInfo,
  ClientLeadInfoTab,
  FormSelectionScreen,
  InputFormField,
  LeadProgress,
  LeadProgressInfo,
  Report,
  RulesetTCPD,
  SoftsanctionProcess,
  SoftSanctionRuleset,
  UGROPurchaseMethod,
  UGROTurnoverMethod,
} from '@screens/index';
import {ClientNavigatorType, SoftNavigatorType} from '@type/NavigatorTypes';
import {Softsanction} from '@screens/SoftSanction/Softsanction';

const Stack = createNativeStackNavigator<ClientNavigatorType>();
const SoftStack = createNativeStackNavigator<SoftNavigatorType>();

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
    </Stack.Navigator>
  );
};

export const SoftNavigator = () => {
  return (
    <Stack.Navigator>
      <SoftStack.Screen name="Softsanction" component={Softsanction} />
    </Stack.Navigator>
  );
};
