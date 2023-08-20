import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import {getCurrentPosition, getFirebaseData, pushFirebaseData} from '../../api';
import MapView, {Heatmap, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './styles';
// import {HeatmapTileProvider} from 'react-native-maps';

//position
// {"coords": {"accuracy": 5, "altitude": 5, "heading": 0, "latitude": 37.421998333333335, "longitude": -122.084, "speed": 0},
// "extras": {"maxCn0": 0, "meanCn0": 0, "satellites": 0}, "mocked": false, "timestamp": 1692542698046}

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({});
  const [region, setRegion] = useState();
  const [processedData, setProcessedData] = useState([]);
  useEffect(() => {
    getFirebaseData(setData);

    //her 1 dk da bir verileri çek
    const intervalGet = setInterval(() => {
      getFirebaseData(setData);
      console.log('get data');
    }, 60000);

    // her 10 sn de bir veri gönder
    const intervalPush = setInterval(() => {
      getCurrentPosition(setPosition);
      pushFirebaseData(position);
    }, 10000);

    return () => {
      // clearInterval(intervalGet);
      clearInterval(intervalPush);
    };
  }, []);

  useEffect(() => {
    console.log('--------------------');
    console.log('position : ', position);
    if (
      position &&
      position.coords &&
      position.coords.latitude !== undefined &&
      position.coords.longitude !== undefined
    ) {
      console.log('position.coords : ', position.coords);
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
    console.log('--------------------');
  }, [position]);

  useEffect(() => {
    const processed = Object.values(data).map(item => ({
      latitude: item.coords.latitude,
      longitude: item.coords.longitude,
      weight: 1,
    }));
    setProcessedData(processed);
  }, [data]);

  console.log('processedData', processedData);
  return (
    <View style={styles.container}>
      <Button title="get" onPress={() => getFirebaseData(setData)} />
      {data ||
      data !== null ||
      data !== undefined ||
      processedData ||
      processedData !== null ||
      processedData !== undefined ||
      position ? (
        <MapView
          zoomEnabled={true}
          zoomControlEnabled={true}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          onRegionChange={reg => console.log('region on change : ', reg)}
          region={
            region
              ? region
              : {
                  latitude: 37.8746,
                  longitude: 32.4943,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
          }>
          {processedData.length > 0 && (
            <Heatmap
              points={processedData}
              opacity={0.8}
              radius={50}
              maxIntensity={100}
              gradientSmoothing={10}
              heatmapMode={'POINTS_DENSITY'}
            />
          )}
        </MapView>
      ) : (
        <Text>bekle</Text>
      )}
    </View>
  );
};
