import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './login-stack';
import BottomTabs from './bottom-tabs';

const Stack = createNativeStackNavigator();

export default AppStack = () => {
  /**
   * login ? bottom-tabs : login-stack
   * with async-storage
   */

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="login-stack" component={LoginStack} />
        <Stack.Screen name="bottom-tabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
