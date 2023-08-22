import React, {useState} from 'react';
import {View, Text, Pressable, Alert, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/slice/user-slice';
import {storeUserData} from '../../utils/storage';
import styles from './styles';
import auth from '@react-native-firebase/auth';

const userData = {
  name: 'Muazzez Aydın',
  email: 'ayd.muazzez@gmail.com',
  password: '123_test',
};

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const signInFirebase = async () => {
    try {
      let response = await auth().signInWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      if (response) {
        console.log(response);
        Alert.alert('Successful Login');
        dispatch(login(userData));
        storeUserData(userData);
      }
    } catch (e) {
      Alert.alert('Login Failed', e.message);
    }
  };

  const loginButtonPress = () => {
    signInFirebase();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.infotTextContainer}>
        <Text>Default User</Text>
        <Text>User : {userData.name}</Text>
        <Text>Email : {userData.email}</Text>
        <Text>Password : {userData.password}</Text>
      </View>

      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={() => loginButtonPress()}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};
