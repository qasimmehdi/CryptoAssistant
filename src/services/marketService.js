import axios from "axios";

export const getCoins = (limit) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/coins/get?limit=${limit}`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
