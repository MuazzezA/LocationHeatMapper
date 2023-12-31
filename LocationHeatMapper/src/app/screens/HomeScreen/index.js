import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {getCurrentPosition, getFirebaseData} from '../../api';
import MapView, {Heatmap, Marker, Polyline} from 'react-native-maps';
import styles from './styles';

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({});
  const [region, setRegion] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCurrentPosition(e => setPosition(e));
    getFirebaseData(setData);

    const intervalGet = setInterval(() => {
      getFirebaseData(data => setData(data));
      setCount(count + 1);
    }, 60000);

    return () => {
      clearInterval(intervalGet);
    };
  }, []);

  useEffect(() => {
    if (
      position?.coords?.latitude !== undefined &&
      position?.coords?.longitude !== undefined
    ) {
      const {latitude, longitude} = position.coords;
      console.log('set position');
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }

    if (!position && data) {
      const lastData = data[data.length - 1];
      console.log('set position last data');
      if (lastData) {
        position.coords.latitude = lastData.coords.latitude;
        position.coords.longitude = lastData.coords.longitude;
      }
    }
  }, [position, data]);

  useEffect(() => {
    const processed = Object.values(data).map(item => ({
      latitude: item.coords.latitude,
      longitude: item.coords.longitude,
      weight: 1,
    }));
    setProcessedData(processed);
  }, [data]);

  const onPressReload = () => {
    getFirebaseData(data => setData(data));
    setCount(count + 1);
  };

  return (
    <View style={styles.container}>
      {data || processedData || position || region ? (
        <>
          <MapView
            zoomEnabled={true}
            zoomControlEnabled={true}
            style={styles.map}
            region={region}>
            {processedData.length > 0 && (
              <Heatmap
                points={processedData}
                maxIntensity={100}
                gradientSmoothing={10}
                heatmapMode={'POINTS_DENSITY'}
              />
            )}
            {/* {processedData.length > 0 && (
              <Polyline
                coordinates={processedData}
                strokeWidth={2}
                strokeColor="blue"
              />
            )} */}
            {position.coords && (
              <Marker
                coordinate={{
                  latitude: position?.coords?.latitude,
                  longitude: position?.coords?.longitude,
                }}
              />
            )}
          </MapView>

          <Pressable onPress={() => onPressReload()} style={styles.button}>
            <Text style={styles.reloadText}>RELOAD DATA : {count}</Text>
          </Pressable>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};
