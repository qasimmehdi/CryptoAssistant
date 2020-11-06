import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      console.log('from storage' + value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.log(e);
  }

  console.log('Done.');
};
