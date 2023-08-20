import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {getCurrentPosition, getFirebaseData, pushFirebaseData} from '../../api';

export const HomeScreen = () => {
  const [data, setData] = useState({});
  const [position, setPosition] = useState({});

  useEffect(() => {
    getFirebaseData(setData);

    // her 1 dk da bir verileri çek
    const intervalGet = setInterval(() => {
      getFirebaseData(setData);
      console.log('get data');
    }, 30000);

    // her 10 sn de bir veri gönder
    const intervalPush = setInterval(() => {
      getCurrentPosition(setPosition);
      pushFirebaseData(position);
    }, 10000);

    return () => {
      clearInterval(intervalGet);
      clearInterval(intervalPush);
    };
  }, []);

  console.log('----');

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
        }}>
        {JSON.stringify(position)}
      </Text>
      <Text>data : {JSON.stringify(data)}</Text>
    </SafeAreaView>
  );
};
