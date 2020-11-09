import EditEmail from './email.reducers';
import EditPassword from './password.reducers';
import EditUsername from './username.reducers';
import setSelectedCoin from './coin.reducer';
import Header from './header.reducer';
import Token from './token.reducer';
import fcmToken from './fcmToken.reducer';

import {combineReducers} from 'redux';

const Reducer = combineReducers({
  EditEmail,
  EditPassword,
  EditUsername,
  setSelectedCoin,
  Header,
  Token,
  fcmToken,
});

export default Reducer;
