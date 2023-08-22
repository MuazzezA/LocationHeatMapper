import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserData = async userObj => {
  try {
    const jsonValue = JSON.stringify(userObj);
    await AsyncStorage.setItem('@USER', jsonValue);
  } catch (e) {
    console.error('Error:Save ', e);
  }
};

const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@USER');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error:Read ', e);
  }
};

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@USER');
  } catch (e) {
    console.error('Error:Remove ', e);
  }
};

export {storeUserData, getUserData, removeUserData};
