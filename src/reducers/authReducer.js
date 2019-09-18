import { REGISTER, SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    user: null,
    token: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REGISTER:
            return { ...state, isSignedIn: true, user: payload.response.user, token: payload.response.token };
        case SIGN_IN:
            return { ...state, isSignedIn: true, user: payload.response.user, token: payload.response.token };
        case SIGN_OUT: 
            return { ...state, isSignedIn: false, user: null, token: null };
        default:
            return state;
    }
}