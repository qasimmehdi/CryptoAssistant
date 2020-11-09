import axios from 'axios';

export const addNotification = (requestType, fcmToken, base, quote) => {
  const data = {
    token: fcmToken,
    currencyName: base,
    currencyPair: base + '/' + quote,
  };

  return axios[requestType]('/alerts', data)
    .then(function(response) {
      console.log(response);
      if (response.status === 200) {
        return true;
      }
    })
    .catch(function(error) {
      console.log(error);
      return false;
    });
};
