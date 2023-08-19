import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import AppStack from './navigation/app-stack';
import store from './redux/store';

import firebase from '@react-native-firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};
export default App;
