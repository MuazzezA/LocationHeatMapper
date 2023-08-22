import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppStack from './navigation/app-stack';
import store from './redux/store';
import firebase from '@react-native-firebase/app';
import {PermissionsAndroid, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BackgroundJob from 'react-native-background-actions';
import {pushFirebaseData} from './api';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const options = {
  taskName: 'LocationTask',
  taskTitle: 'Push Location',
  taskDesc: 'Location services are used.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 10000,
  },
};

const App = () => {
  const usingHermes =
    typeof HermesInternal === 'object' && HermesInternal !== null;

  let playing = BackgroundJob.isRunning();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const taskRandom = async taskData => {
    console.log('Starting background task with data:', taskData);

    const {delay} = taskData;

    while (BackgroundJob.isRunning()) {
      await new Promise(async resolve => {
        Geolocation.getCurrentPosition(
          position => {
            pushFirebaseData(position);
            console.log('pushFirebaseData *********** :app');
            resolve();
          },
          error => {
            if (error.code === 1) {
              console.error('Location permission error : ', error);
            } else {
              console.error('else error : ', error);
            }
            resolve();
          },
          {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000},
        );
      });

      await sleep(delay); // 10 saniye
    }
  };

  const toggleBackground = async () => {
    playing = !playing;
    if (playing) {
      try {
        console.log('Trying to start background service ');
        await BackgroundJob.start(taskRandom, options).then(() => {
          console.log('Background service has been started');
          Alert.alert('Background service has been started');
        });
      } catch (e) {
        console.log('Error starting background service', e);
      }
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted : ', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        // setMapProvider(PROVIDER_GOOGLE);
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    requestLocationPermission().then(result => {
      console.log('result : ', result);
      if (result) {
        toggleBackground();
      } else {
        // izin alamadı - kontrol et
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};
export default App;
