export const setFcmToken = "SET FCM TOKEN";

export const fcmToken = (payload) => ({
  type: setFcmToken,
  payload,
});
