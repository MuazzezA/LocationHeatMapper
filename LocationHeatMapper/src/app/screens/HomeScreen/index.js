import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {getCurrentPosition, getFirebaseData, pushFirebaseData} from '../../api';
import MapView, {
  Heatmap,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import styles from './styles';

import Geolocation from '@react-native-community/geolocation';

//position
// {"coords": {"accuracy": 5, "altitude": 5, "heading": 0, "latitude": 37.421998333333335, "longitude": -122.084, "speed": 0},
// "extras": {"maxCn0": 0, "meanCn0": 0, "satellites": 0}, "mocked": false, "timestamp": 1692542698046}

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [position, setPosition] = useState({});
  const [region, setRegion] = useState();
  const [processedData, setProcessedData] = useState([]);
  const [mapProvider, setMapProvider] = useState(PROVIDER_DEFAULT);
  const [count, setCount] = useState(0);

  useEffect(() => {
    requestLocationPermission();

    getFirebaseData(setData);

    //her 1 dk da bir verileri çek
    const intervalGet = setInterval(() => {
      getFirebaseData(setData);
      console.log('get data');
    }, 60000);

    // her 10 sn de bir veri gönder
    const intervalPush = setInterval(() => {
      //getCurrentPosition(setPosition);

      Geolocation.getCurrentPosition(
        position => {
          // Konum alındı, işlemleri burada yapabilirsiniz
          setPosition(position);
          setCount(count + 1);
          pushFirebaseData(position);
          Alert.alert(
            'Konum ayarlandı -interval push-',
            `${JSON.stringify(position)}`,
          );
        },
        error => {
          if (error.code === 1) {
            // Kullanıcı konumu kapalı
            Alert.alert(
              'Konum Kapalı',
              'Uygulamayı kullanabilmek için konumunuzu açmanız gerekmektedir.',
              [
                {
                  text: 'Ayarlar',
                  onPress: () => {
                    // Ayarlara yönlendir
                    if (Platform.OS === 'ios') {
                      Linking.openURL('app-settings:');
                    } else if (Platform.OS === 'android') {
                      Linking.openSettings();
                      //Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
                    }
                  },
                },
                {text: 'Vazgeç', style: 'cancel'},
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Bir hata oluştu', error.message);
          }
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );

      //pushFirebaseData(position);

      // getCurrentPosition(newPosition => {
      //   setPosition(newPosition);
      //   pushFirebaseData(newPosition); // Yalnızca konum alındığında pushFirebaseData çağrılır
      // });
    }, 10000);

    return () => {
      clearInterval(intervalGet);
      clearInterval(intervalPush);
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        setMapProvider(PROVIDER_GOOGLE);
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
      {data ||
      data !== null ||
      data !== undefined ||
      processedData ||
      processedData !== null ||
      processedData !== undefined ||
      position ? (
        <>
          <MapView
            //onMapReady={() => console.log('map ready')}
            zoomEnabled={true}
            zoomControlEnabled={true}
            //mapType={Platform.OS == 'android' ? 'none' : 'standard'}
            //provider={mapProvider} // remove if not using Google Maps
            style={styles.map}
            //onRegionChange={reg => console.log('region on change : ', reg)}
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
          <TouchableOpacity
            onPress={() => {
              getFirebaseData(setData);
              Alert.alert(
                'Data Reloaded',
                `${JSON.stringify(data) || 'no data'}`,
              );
            }}
            style={styles.button}>
            <Text>RELOAD DATA getpush:{count}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>bekle</Text>
      )}
    </View>
  );
};
