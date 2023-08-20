import React, {useEffect} from 'react';
import {View, Text, FlatList, ScrollView, SafeAreaView} from 'react-native';
import {getFirebaseData, pushFirebaseData} from '../../api';

const testPush = [
  {
    latitude: 37.8715,
    longitude: 32.4845,
    name: 'Konya',
  },
  {
    latitude: 39.9334,
    longitude: 32.8597,
    name: 'Ankara',
  },
  {
    latitude: 41.0082,
    longitude: 28.9784,
    name: 'Istanbul',
  },
  {
    latitude: 38.4192,
    longitude: 27.1287,
    name: 'Izmir',
  },
  {
    latitude: 40.1826,
    longitude: 29.0669,
    name: 'Bursa',
  },
];

export const HomeScreen = () => {
  const [data, setData] = React.useState({});
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    getFirebaseData(setData);

    // her 1 dk da bir verileri çek
    const intervalGet = setInterval(() => {
      getFirebaseData(setData);
    }, 60000);

    // her 10 sn de bir veri gönder
    const intervalPush = setInterval(() => {
      pushFirebaseData(testPush[Math.floor(Math.random() * testPush.length)]);
      //console.log('push');
    }, 10000);

    return () => {
      clearInterval(intervalGet);
      clearInterval(intervalPush);
    };
  }, []);

  console.log('------------------- data');
  console.log('data', data);
  console.log('------------------- **');
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>count : {count}</Text>
      <Text>data : {JSON.stringify(data)}</Text>
    </SafeAreaView>
  );
};
