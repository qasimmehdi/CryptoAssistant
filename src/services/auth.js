import axios from 'axios';
import {SInfoGet, SInfoSet} from './sensitiveStorage';

export const loginUser = (user, pass) => {
   const data = {
      username: user,
      password: pass
   }

   return axios.post('/authenticate', data)
      .then(function (response) {
         if (response.status == 200) {
            // (async () => await storeData('auth_token', response.data.access_token))();
            // (async () => await getData('auth_token'))();
            //let token;            
            (async () => await SInfoSet('auth_token', response.data.token))();
            (async () => await SInfoGet('auth_token'))();
            return true;
         }
      })
      .catch(function (error) {
         console.log(error);
         return false;
      });
}

export const registerUser = (user, pass, email) => {
   const data = {
      firstName: "",
      lastName: "",
      email: email,
      userName: user,
      password: pass
   }

   return axios.post('/register', data)
      .then(function (response) {
         if (response.status == 200) {
            return true;
         }
      })
      .catch(function (error) {
         console.log(error.response.status);
         return false;
      });
}

