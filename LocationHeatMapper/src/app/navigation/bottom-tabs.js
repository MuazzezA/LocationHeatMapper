import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileStack from './profile-stack';
import HomeStack from './home-stack';

const Tab = createBottomTabNavigator();

export default BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home-stack" component={HomeStack} />
      <Tab.Screen name="profile-stack" component={ProfileStack} />
    </Tab.Navigator>
  );
};
