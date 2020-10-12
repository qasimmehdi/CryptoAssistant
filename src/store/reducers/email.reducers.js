import * as Actions from '../actions';

const initialState = {
    email: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case Actions.SetEmail:
        return { ...state, ...payload }

    default:
        return state
    }
}
