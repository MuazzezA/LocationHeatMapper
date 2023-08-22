import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login-screen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
