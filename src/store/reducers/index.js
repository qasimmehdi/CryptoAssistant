import EditEmail from './email.reducers';
import EditPassword from './password.reducers';
import EditUsername from './username.reducers';
import setSelectedCoin from './coin.reducer';
import Header from './header.reducer';

import {combineReducers} from 'redux';

const Reducer = combineReducers({
  EditEmail,
  EditPassword,
  EditUsername,
  setSelectedCoin,
  Header,
});

export default Reducer;
