import {
    FETCH_POSTS, FETCH_POST, DELETE_POST
} from '../actions/types';

export default (state = [], { type, payload }) => {
    switch (type) {
        case FETCH_POSTS:
           return payload;  
        case FETCH_POST:
            var found = false;
            if (state.length === 0) {
                return [payload];
            }
            let result = state.map((state) =>{
                if (state.id === payload.id) {
                    found = true;
                    return payload;
                }
                return state;
            });
            
            if (found === false) {
                result.unshift(payload);
            }
            return result;
        case DELETE_POST:
            return state.filter(({id}) => id !== payload);
        default: 
            return state;
    }
}