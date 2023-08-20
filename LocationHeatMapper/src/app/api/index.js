import {firebase} from '@react-native-firebase/database';
import {firebaseConfig} from '../api/firebase';

export const getFirebaseData = setData => {
  const reference = firebase
    .app()
    .database(firebaseConfig.databaseURL)
    .ref('/locations');

  reference.once('value', snapshot => {
    // const dataFromSnapshot = snapshot.val();
    // const dataArray = Object.values(dataFromSnapshot.locations || []); // "locations" alt nesnesinin içindeki verileri dizi olarak alıyoruz
    // setData(dataArray);

    setData(snapshot.val());

    // const x = Object.keys(snapshot.val()).length;
    // setCount(x);
  });
};

export const pushFirebaseData = newdata => {
  const newReference = firebase.app().database().ref('/locations').push();

  newReference.set(newdata).then(() => console.log('Data updated.'));
};
