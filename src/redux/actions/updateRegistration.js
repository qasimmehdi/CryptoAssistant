export const UPDATE_REGISTRATION = "UPDATE_REGISTRATION";

const updateRegistration = (payload) => {
    return {
        type: UPDATE_REGISTRATION,
        payload: payload
    }
};

export default updateRegistration;