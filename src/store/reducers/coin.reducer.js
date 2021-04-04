import { SelectedCoin } from "../actions";

const initialState = {
  base: "",
  quote: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SelectedCoin:
      return { ...state, ...payload };

    default:
      return state;
  }
};
