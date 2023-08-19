import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import AppStack from './navigation/app-stack';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};
export default App;
