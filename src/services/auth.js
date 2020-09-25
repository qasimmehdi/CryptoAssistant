import axios from 'axios';
import {storeData, getData} from './localStorage';
import {SInfoGet, SInfoSet} from './sensitiveStorage';

axios.defaults.baseURL = 'http://heroku-sm.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const loginUser = (user, pass) => {
   const data = {
      username: user,
      password: pass,
      grant_type: 'password',
      client_id: '2',
      client_secret: 'tF6K5AXeGnFX5e3cg46nF0zRcf2tuzvVwEkdxZE0'
   }

   return axios.post('/oauth/token', data)
      .then(function (response) {
         if (response.status == 200) {
            // (async () => await storeData('auth_token', response.data.access_token))();
            // (async () => await getData('auth_token'))();
            //let token;            
            async () => await SInfoSet('auth_token', response.data.access_token)();
            (async () => await SInfoGet('auth_token'))();
            //let token = await SInfoGet('auth_token');
            //console.log('this auth token '+token);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

            console.log(response.status)
            console.log(axios.defaults.headers.common['Authorization']);
            axios.get('/api/account?tt=1')
               .then(function (response) {
                  // handle success
                  console.log(response.data);
               })
               .catch(function (error) {
                  // handle error
                  console.log('error get');
               });
            
            return true;
         }
      })
      .catch(function (error) {
         console.log(error.response.status);
         return false;
      });
}


