import { createStore, combineReducers } from 'redux';
import registrationReducer from './reducers/registrationReducer';

const reducer = combineReducers({ register: registrationReducer });
const initialState = {
    register: {
        info: {
            username: "",
            password: "",
            email: ""
        }
    }
};
const store = createStore(reducer, initialState);

export default store;