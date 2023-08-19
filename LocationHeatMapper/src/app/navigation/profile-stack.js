import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../screens';

const Stack = createNativeStackNavigator();

export default ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="profile-screen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
