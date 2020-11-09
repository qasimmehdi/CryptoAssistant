import * as Actions from '../actions';

const initialState = {
  token: '',
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case Actions.setFcmToken:
      return {...state, ...payload};

    default:
      return state;
  }
};
