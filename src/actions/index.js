import blog from '../apis/blog';
import history from '../history';
import { checkForErrors } from '../helpers/handleResponse';

import { 
    REGISTER, SIGN_IN, SIGN_OUT, 
    FETCH_POSTS, FETCH_POST,DELETE_POST, 
    AUTHENTICATE,ADD_ACTION, 
    EDIT_ACTION, DELETE_ACTION
} from './types';


export const authenticate = data => {
    return {
        type: AUTHENTICATE,
        payload: data
    };
};

export const registerAcion = (data, callback) => async dispatch => {
    const response = await blog().post('/register', data);
    const errors = checkForErrors(response);
    if (errors) {
        callback(errors);
    } else {
        localStorage.setItem('auth_user', JSON.stringify(response.data.response));
        dispatch({ type: REGISTER, payload: response.data.response });
        history.push('/');
    }
};

export const signIn = (data, callback) => async dispatch => {
    const response = await blog().post('/login', data);
    const errors = checkForErrors(response);
    if (errors) {
        callback(errors);
    } else {
        localStorage.setItem('auth_user', JSON.stringify(response.data.response));
        dispatch({ type: SIGN_IN, payload: response.data.response });
        history.push('/');
    }
}

export const signOut = () => async dispatch => {
    await blog().post('/logout');
    localStorage.removeItem('auth_user');
    dispatch({ type: SIGN_OUT });
    if (history.location.pathname === '/') {
        history.push('/', {refresh: true});
    } else {
        history.push('/');
    }
} 


export const fetchPosts = () => async dispatch => {
    const response = await blog().get('/posts/get');
    dispatch({ type: FETCH_POSTS, payload: response.data.response.posts });
};

export const fetchPost = id => async dispatch => {
    const response = await blog().get(`/post/get/${id}`);
    dispatch({ type: FETCH_POST, payload: response.data.response.post });
}

export const createPost = (data, errorCallback, successCallback) => async dispatch => {
    const response = await blog().post('/post/add', data);
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            errorCallback(errors);
        }
    } else {
        dispatch({ type: FETCH_POST, payload: response.data.response.post });
        successCallback(response.data.response.message);
    }
}

export const editPost = (id, data, errorCallback, successCallback) => async dispatch => {
    const response = await blog().put(`/post/edit/${id}`, data);
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            errorCallback(errors);
        }
    } else {
        dispatch({ type: FETCH_POST, payload: response.data.response.post });
        successCallback(response.data.response.message);
    }
}

export const delePost = (id, callback) => async dispatch => {
    const response = await blog().delete(`/post/delete/${id}`);
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            callback(errors);
        }
    } else {
        dispatch({ type: FETCH_POST, payload: response.data.response.post });
    }
}

export const rejectPostAction = (id, action, errorCallback, successCallback) => async dispatch => {
    const response = await blog().post('/action', {id, action_type: 'reject' });
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            errorCallback(errors);
        }
    } else {
        if (action === ADD_ACTION) {
            dispatch({ type: DELETE_POST, payload: response.data.response.item.id });
            successCallback(response.data.response.message);
        } else if (action === DELETE_ACTION || action === EDIT_ACTION) {
            dispatch({ type: FETCH_POST, payload: response.data.response.item });
            successCallback(response.data.response.message);
        } else {
            errorCallback('Ann Error has Occured please try again later');
        }
    }
    
}
export const approvePostAction = (id, action, errorCallback, successCallback) => async dispatch => {
    const response = await blog().post('/action', { id, action_type: 'approve'});
    const errors = checkForErrors(response);
    if (errors) {
        if (errors === 'Unauthenticated') {
            history.push('/auth/login');
        } else {
            errorCallback(errors);
        }
    } else {
        if (action === DELETE_ACTION) {
            dispatch({ type: DELETE_POST, payload: response.data.response.item.id });
            successCallback(response.data.response.message);
        } else if (action === ADD_ACTION || action === EDIT_ACTION) {
            dispatch({ type: FETCH_POST, payload: response.data.response.item });
            successCallback(response.data.response.message);
        } else {
            errorCallback('Ann Error has Occured please try again later');
        }
    }
}


