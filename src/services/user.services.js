import axios from 'axios';

export const addNotification = (requestType, fcmToken, base, quote) => {
  const data = {
    token: fcmToken,
    base: base,
    quote: quote,
  };
  console.log(data, requestType);

  if (requestType === 'post') {
    return axios
      .post('/alerts', data)
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
  } else {
    return axios
      .delete('/alerts', {data: data})
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
  }
};
