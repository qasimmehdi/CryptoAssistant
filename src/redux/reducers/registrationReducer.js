import { UPDATE_REGISTRATION } from '../actions/updateRegistration';

const registrationReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_REGISTRATION:
            return { registrationInfo : payload }
        default:
            return state
    };
};

export default registrationReducer;