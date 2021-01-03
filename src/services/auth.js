import axios from 'axios';
import {SInfoGet, SInfoSet} from './sensitiveStorage';

export const loginUser = (user, pass) => {
  const data = {
    email: user,
    username: user,
    password: pass,
  };

  return axios
    .post('/authenticate', data)
    .then(function(response) {
      if (response.status == 200) {
        // (async () => await storeData('auth_token', response.data.access_token))();
        // (async () => await getData('auth_token'))();
        //let token;
        (async () => await SInfoSet('auth_token', response.data.token))();
        (async () => await SInfoGet('auth_token'))();
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.token;
        return true;
      }
    })
    .catch(function(error) {
      console.log(error);
      return false;
    });
};

export const registerUser = (user, pass, email) => {
  const data = {
    firstName: '',
    lastName: '',
    email: email,
    userName: user,
    password: pass,
  };
  console.log(data);
  return axios
    .post('/register', data)
    .then(function(response) {
      if (response.status == 200) {
        console.log(response);
        return true;
      }
    })
    .catch(function(error) {
      console.log(error);
      return false;
    });
};

export const forgetGetCode = email => {
  const data = {
    email: email,
  };
  console.log(data);
  return axios.post('/forget', data);
};

export const ModifyPassword = (code, pass) => {
  const data = {
    code: code,
  };
  console.log(data);
  return axios
    .post('/forget/checkCode', data)
    .then(function(response) {
      if (response.status == 200) {
        console.log('resp', response.data);
        let data2 = response.data;
        data2.password = pass;
        console.log(data2);
        return axios
          .put('/forget/save', data2)
          .then(function(response2) {
            if (response2.status == 200) {
              console.log('reset', response2);
              return true;
            }
          })
          .catch(function(error) {
            console.log('mod', error);
            return false;
          });
      }
    })
    .catch(function(error) {
      console.log('check', error);
      return false;
    });
};
