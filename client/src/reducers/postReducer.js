import {
    FETCH_POSTS, FETCH_POST, DELETE_POST, SET_INITIAL_POSTS
} from '../actions/types';

export default (state = [], { type, payload }) => {
    switch (type) {
        case SET_INITIAL_POSTS:
            return payload;
        case FETCH_POSTS:
            localStorage.setItem('posts', JSON.stringify(payload));
           return payload;  
        case FETCH_POST:
            var found = false;
            if (state.length === 0) {
                localStorage.setItem('posts', JSON.stringify([payload]));
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
            localStorage.setItem('posts', JSON.stringify(result));
            return result;
        case DELETE_POST:
            const newState = state.filter(({id}) => id !== payload);
            localStorage.setItem('posts', JSON.stringify(newState));
            return newState;
        default: 
            return state;
    }
}