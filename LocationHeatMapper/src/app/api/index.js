import {firebase} from '@react-native-firebase/database';
import {firebaseConfig} from '../../../config/firebaseSettings';
import Geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';

export const getFirebaseData = setData => {
  const reference = firebase
    .app()
    .database(firebaseConfig.databaseURL)
    .ref('/locations');
  reference.once('value', snapshot => {
    setData(snapshot.val());
  });
};

export const pushFirebaseData = newdata => {
  try {
    const newReference = firebase.app().database().ref('/locations').push();
    newReference.set(newdata).then(() => console.log('Data pushed.'));
  } catch (error) {
    Alert.alert('pushFirebaseData Error', JSON.stringify(error));
  }
};

export const getCurrentPosition = setPosition => {
  Geolocation.getCurrentPosition(
    position => {
      setPosition(position);
    },
    error => {
      if (error.code === 1) {
        console.error('Location Permission Error : ', error);
      } else {
        console.error('Error : ', error);
      }
    },
    {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
  );
};
