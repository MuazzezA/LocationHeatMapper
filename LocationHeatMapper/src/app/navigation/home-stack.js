import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreem} from '../screens';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home-screen" component={HomeScreem} />
    </Stack.Navigator>
  );
};
