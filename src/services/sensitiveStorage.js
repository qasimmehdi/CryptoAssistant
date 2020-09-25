import SInfo from 'react-native-sensitive-info';

export const SInfoSet = async (key, val) => {
    SInfo.setItem(key, val, {});
}

export const SInfoGet = async (key) => {
    SInfo.getItem(key,{})
        .then(value => {
            console.log('get '+value) //value2
            return value;
        });
}
