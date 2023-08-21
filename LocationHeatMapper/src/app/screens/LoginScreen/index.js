import React, {useEffect} from 'react';
import {View, Text, Pressable, Alert, Platform, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/slice/user-slice';
import {storeUserData} from '../../utils/storage';
import Geolocation from '@react-native-community/geolocation';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  // const {user} = useSelector(state => state.user);
  const loginButtonPress = () => {
    console.log('login button press');
    dispatch(login({name: 'test'}));
    storeUserData({name: 'test'});
  };

  useEffect(() => {
    // Kullanıcıya konum izni ve konum ayarlarını kontrol et
    Geolocation.getCurrentPosition(
      position => {
        // Konum alındı, işlemleri burada yapabilirsiniz
        Alert.alert(
          'Konum Alındı',
          `${JSON.stringify(position) || 'no position'}`,
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
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fffeeb'}}>
      <Text>login</Text>
      <Pressable
        style={{margin: 20, backgroundColor: 'pink', height: 50, width: 100}}
        onPress={() => loginButtonPress()}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};
