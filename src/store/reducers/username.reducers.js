import * as Actions from '../actions';

const initialState = {
    username: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Actions.SetUsername:
        return { ...state, ...payload }

    default:
        return state
    }
}
