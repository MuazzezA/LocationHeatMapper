import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppStack from './navigation/app-stack';

// redux

const App = () => {
  return (
    <SafeAreaView style={styles.flex}>
      <AppStack />
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
