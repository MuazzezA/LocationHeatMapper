import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import styles from './styles';
import {TextContainer} from '../../components';
import {removeUserData} from '../../utils/storage';
import {reset} from '../../redux/slice/user-slice';
export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.user);

  const onPressLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(reset());
          removeUserData();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'login-stack'}],
            }),
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.body}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.textContainer}>
          <TextContainer text={user.name} title={'Name'} />
          <TextContainer text={user.email} title={'Email'} />
        </View>
      </View>
      <Pressable style={styles.logoutButton} onPress={onPressLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};
