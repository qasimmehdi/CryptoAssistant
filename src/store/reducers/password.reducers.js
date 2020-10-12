import * as Actions from '../actions';

const initialState = {
    password: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Actions.SetPassword:
        return { ...state, ...payload }

    default:
        return state
    }
}
