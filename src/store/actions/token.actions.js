export const setToken = "SET TOKEN";

export const token = (payload) => ({
  type: setToken,
  payload,
});
