import * as Actions from "../actions";

const initialState = {
  title: "Crypto Assistant",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case Actions.ChangeHeader:
      return { ...state, ...payload };

    default:
      return state;
  }
};
