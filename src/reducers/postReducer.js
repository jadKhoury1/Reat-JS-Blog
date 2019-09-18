import _ from 'lodash';

import {
    FETCH_POSTS, FETCH_POST
} from '../actions/types';

export default (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_POSTS:
            return { ...state, ..._.mapKeys(payload, 'id')};
        case FETCH_POST:
            return {...state, [payload.id]: payload };
        default: 
            return state;
        
    }
}