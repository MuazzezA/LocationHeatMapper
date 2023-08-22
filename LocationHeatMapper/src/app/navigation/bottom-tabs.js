import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileStack from './profile-stack';
import HomeStack from './home-stack';
import {HomeLine, HomeFill, ProfileFill, ProfileLine} from '../../assets/svg';
import {StyleSheet, View} from 'react-native';
import {sizes} from '../../assets/theme/theme';

const Tab = createBottomTabNavigator();

export default BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home-stack">
      <Tab.Screen
        name="home-stack"
        component={HomeStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.icon}>
                {focused ? <HomeFill /> : <HomeLine />}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile-stack"
        component={ProfileStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <View style={styles.icon}>
                {focused ? <ProfileFill /> : <ProfileLine />}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingTop: sizes.base,
  },
});
