import _ from 'lodash';

import {
    FETCH_POSTS, FETCH_POST, DELETE_POST
} from '../actions/types';

export default (state = {}, { type, payload }) => {
    switch (type) {
        case FETCH_POSTS:
            return { ..._.mapKeys(payload, 'id') };
        case FETCH_POST:
            return { ...state, [payload.id]: payload };
        case DELETE_POST:
            return _.omit(state, payload);
        default: 
            return state;
    }
}