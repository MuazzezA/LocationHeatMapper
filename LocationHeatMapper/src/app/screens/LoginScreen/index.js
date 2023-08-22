import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice/user-slice';
import {storeUserData} from '../../utils/storage';
import styles from './styles';

const userData = {
  name: 'Muazzez Aydın',
  email: 'ayd.muazzez@gmail.com',
};

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const loginButtonPress = () => {
    dispatch(login(userData));
    storeUserData(userData);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.infotTextContainer}>
        <Text>Default user data:</Text>
        <Text>User : {userData.name}</Text>
        <Text>Email : {userData.email}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => loginButtonPress()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};
