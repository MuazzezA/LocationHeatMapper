import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import LoginStack from './login-stack';
import BottomTabs from './bottom-tabs';
import {getUserData} from '../utils/storage';
import {login, updateAuthenticated} from '../redux/slice/user-slice';

const Stack = createNativeStackNavigator();

export default AppStack = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.user);

  const userLogin = async () => {
    const user = await getUserData();

    if (!user) {
      dispatch(login(user));
    } else if (user) {
      dispatch(updateAuthenticated(true));
    }
  };

  useEffect(() => {
    userLogin();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isAuthenticated ? (
            <Stack.Screen name="bottom-tabs" component={BottomTabs} />
          ) : (
            <Stack.Screen name="login-stack" component={LoginStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
