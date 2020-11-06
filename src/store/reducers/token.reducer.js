import * as Actions from '../actions';

const initialState = {
  token: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.setToken:
      return {...state, ...payload};

    default:
      return state;
  }
};
