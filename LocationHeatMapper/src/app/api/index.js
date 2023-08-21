import {firebase} from '@react-native-firebase/database';
import {firebaseConfig} from '../api/firebase';
import Geolocation from '@react-native-community/geolocation';
import {Alert, Linking} from 'react-native';

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
  try {
    Alert.alert('pushFirebaseData : ', JSON.stringify(newdata));
    const newReference = firebase.app().database().ref('/locations').push();

    newReference.set(newdata).then(() => console.log('Data pushed.'));
  } catch (error) {
    Alert.alert('pushFirebaseData Error', JSON.stringify(error));
  }
};

export const getCurrentPosition = setPosition => {
  Geolocation.getCurrentPosition(
    pos => {
      setPosition(pos);
      // Alert.alert(
      //   'Konum bulundu -get current position-',
      //   `${JSON.stringify(position)}`,
      // );
    },
    error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
    {enableHighAccuracy: true},
  );
  // const [alert, setAlert] = useState(false);
  // const [tempPosition, setTempPosition] = useState({});

  //   Geolocation.getCurrentPosition(
  //     position => {
  //       // Konum alındı, işlemleri burada yapabilirsiniz
  //       setPosition(pos);
  //       Alert.alert(
  //         'Konum bulundu -get current position-',
  //         `${JSON.stringify(position)}`,
  //       );
  //     },
  //     error => {
  //       if (error.code === 1) {
  //         // Kullanıcı konumu kapalı
  //         Alert.alert(
  //           'Konum Kapalı',
  //           'Uygulamayı kullanabilmek için konumunuzu açmanız gerekmektedir.',
  //           [
  //             {
  //               text: 'Ayarlar',
  //               onPress: () => {
  //                 // Ayarlara yönlendir
  //                 if (Platform.OS === 'ios') {
  //                   Linking.openURL('app-settings:');
  //                 } else if (Platform.OS === 'android') {
  //                   Linking.openSettings();
  //                   //Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
  //                 }
  //               },
  //             },
  //             {text: 'Vazgeç', style: 'cancel'},
  //           ],
  //           {cancelable: false},
  //         );
  //       } else {
  //         Alert.alert('Bir hata oluştu', error.message);
  //       }
  //     },
  //     {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
  //   );
};
