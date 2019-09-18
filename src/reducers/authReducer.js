import { REGISTER, SIGN_IN, SIGN_OUT, AUTHENTICATE } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    user: null,
    token: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case AUTHENTICATE:
            return {...state, isSignedIn: true, user: payload.user, token: payload.token}
        case REGISTER:
            return  { ...state, isSignedIn: true, user: payload.user, token: payload.token };
        case SIGN_IN:
            return { ...state, isSignedIn: true, user: payload.user, token: payload.token };
        case SIGN_OUT: 
            return { ...state, isSignedIn: false, user: null, token: null };
        default:
            return state;
    }
}