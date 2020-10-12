import EditEmail from './email.reducers';
import EditPassword from './password.reducers';
import EditUsername from './username.reducers';

import { combineReducers } from 'redux';

const Reducer = combineReducers({
    EditEmail,
    EditPassword,
    EditUsername
})

export default Reducer;